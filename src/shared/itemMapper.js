import { IExec } from "iexec";
import * as ace from "./constants";
import inboxItemStruct from "../utils/inboxItemStruct.ts";

const iexec = new IExec({ ethProvider: window.ethereum });


export const mapInboxOrders = async (connectedAccount, structuredResponseItems) =>
{
    console.log("structuredResponseItems", structuredResponseItems) ;
    let mapped =  await Promise.all( structuredResponseItems.map(async(item) => {

        var inboxItem = inboxItemStruct(item.id, item.name, item.owner.id) ;

        var orderBook = await iexec.orderbook.fetchDatasetOrderbook(
            item.id,
            {
              app: ace.APP_ADDRESS,
              requester: connectedAccount,
              minTag: ace.TEE_TAG,
              maxTag: ace.TEE_TAG
            }
        );

        if (orderBook && orderBook.orders.length > 0 )
        {
            console.log("ORDER BOOK", orderBook) ;
            inboxItem.status = orderBook.orders[0].status ;
            inboxItem.to = orderBook.orders[0].order.requesterrestrict  ;
            inboxItem.orderHash = orderBook.orders[0].orderHash;
            inboxItem.sendDate = new Date(orderBook.orders[0].publicationTimestamp);
            inboxItem.price =  orderBook.orders[0].order.datasetprice;
            inboxItem.tag =  orderBook.orders[0].order.tag;
            inboxItem.workerpoolrestrict =  orderBook.orders[0].order.workerpoolrestrict;


            if (item.orders && 
                item.orders.length>0 && 
                item.orders[0].deals && 
                item.orders[0].deals.length > 0 
                )
            {

                inboxItem.dealid = item.orders[0].deals[0].id;
                console.log("item.orders[0].deals[0].startTime", Number(item.orders[0].deals[0].startTime)) ; 
                inboxItem.downloadDate = new Date(Number(item.orders[0].deals[0].startTime)*1000);
                inboxItem.status = "ACTIVE"; 

                if (item.orders[0].deals[0].tasks &&  item.orders[0].deals[0].tasks.length > 0 )
                {
                    inboxItem.status = item.orders[0].deals[0].tasks[0].status ;
                    inboxItem.taskid = item.orders[0].deals[0].tasks[0].id;
                    
                }

            }

            return inboxItem
        }
        
    }));

    mapped = mapped.filter((item)=>{
        return null != item && item.to && item.to.toLowerCase() === connectedAccount ; 
    })

    console.log("mapped", mapped) ;

    return mapped ; 
}

export const mapSentItemsOrders = async (connectedAccount, structuredResponseItems) =>
{
    console.log("structuredResponseItems", structuredResponseItems) ;
    let mapped =  await Promise.all( structuredResponseItems.map(async(item) => {

        var inboxItem = inboxItemStruct(item.id, item.name, item.owner.id) ;

        console.log("DATASET ID", item.id) ; 
        let ds = await iexec.dataset.showDataset(item.id) ;

        console.log("SHOWN DATASET", ds, item.id, item.name) ;

        let requester = "0x0000000000000000000000000000000000000000" ; 

        if (item.name.indexOf('#') >-1    )
        {
            
            let foundRequest = item.name.split('#')[1].toLowerCase() ; 
            

            let regExMatch = foundRequest.match(/(\b0x[a-f0-9]{40}\b)/g)
            console.log("GRRRRR", item.name, foundRequest, regExMatch )  ;

            if (regExMatch && regExMatch.length>0)
            {
                requester = regExMatch[0] ;
            }
            console.log("requster", requester)  ;
        }

        let options = {
            requester: requester,
            app: ace.APP_ADDRESS
            ,minTag: ace.TEE_TAG,
            maxTag: ace.TEE_TAG
          };

          console.log("OPTIONS", options) ; 

        var orderBook = await iexec.orderbook.fetchDatasetOrderbook( item.id, options );

        console.log("ORDER BOOK", orderBook) ;

        if (orderBook && orderBook.orders.length > 0 )
        {
            
            inboxItem.status = orderBook.orders[0].status ;
            inboxItem.to = orderBook.orders[0].order.requesterrestrict  ;
            inboxItem.orderHash = orderBook.orders[0].orderHash;
            inboxItem.sendDate = new Date(orderBook.orders[0].publicationTimestamp);
            inboxItem.price =  orderBook.orders[0].order.datasetprice;
            inboxItem.tag =  orderBook.orders[0].order.tag;
            inboxItem.workerpoolrestrict =  orderBook.orders[0].order.workerpoolrestrict;


            if (item.orders && 
                item.orders.length>0 && 
                item.orders[0].deals && 
                item.orders[0].deals.length > 0 
                )
            {

                inboxItem.dealid = item.orders[0].deals[0].id;
                console.log("item.orders[0].deals[0].startTime", Number(item.orders[0].deals[0].startTime)) ; 
                inboxItem.downloadDate = new Date(Number(item.orders[0].deals[0].startTime)*1000);
                inboxItem.status = "ACTIVE"; 

                if (item.orders[0].deals[0].tasks &&  item.orders[0].deals[0].tasks.length > 0 )
                {
                    inboxItem.status = item.orders[0].deals[0].tasks[0].status ;
                    inboxItem.taskid = item.orders[0].deals[0].tasks[0].id;
                }

            }

            return inboxItem
        }
        
    }));

    mapped = mapped.filter((item)=>{
        return null != item && item.from && item.from.toLowerCase() === connectedAccount ; 
    })

    console.log("mapped", mapped) ;

    return mapped ; 
}
