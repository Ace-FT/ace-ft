import * as ace from "./constants";
import { getIexec } from "./getIexec";
import inboxItemStruct from "../utils/inboxItemStruct.ts";

const IS_DEBUG = process.env.REACT_APP_IS_DEBUG == 'true';

const ensLookup = async (items)=>{
    let iexec = getIexec();

    for (let k = 0; k < items.length; k++) {
        try {
            let ensLookup = await iexec.ens.lookupAddress(items[k].to);
            if (ensLookup) { items[k].to = ensLookup; }
        }
        catch (e) { console.error(e); }

        try {
            let ensLookup = await iexec.ens.lookupAddress(items[k].from);
            if (ensLookup) { items[k].from = ensLookup; }
        }
        catch (e) { console.error(e); }
    }

}

export const mapInboxOrders = async (connectedAccount, structuredResponseItems) => {
    let iexec = getIexec();
    if (IS_DEBUG) console.log("structuredResponseItems", structuredResponseItems);

    let mapped = await Promise.all(structuredResponseItems.map(async (item) => {
        var inboxItem = inboxItemStruct(item.id, item.name, item.owner.id);
        var orderBook = await iexec.orderbook.fetchDatasetOrderbook(
            item.id,
            {
                app: ace.APP_ADDRESS,
                requester: connectedAccount,
                minTag: ace.TEE_TAG,
                maxTag: ace.TEE_TAG
            }
        );

        if (orderBook && orderBook.orders.length > 0) {
            if (IS_DEBUG) console.log("ORDER BOOK", orderBook);
            inboxItem.status = orderBook.orders[0].status;
            inboxItem.to = orderBook.orders[0].order.requesterrestrict;

            inboxItem.orderHash = orderBook.orders[0].orderHash;
            inboxItem.sendDate = new Date(orderBook.orders[0].publicationTimestamp);
            inboxItem.price = orderBook.orders[0].order.datasetprice;
            inboxItem.tag = orderBook.orders[0].order.tag;
            inboxItem.workerpoolrestrict = orderBook.orders[0].order.workerpoolrestrict;

            if (item.orders &&
                item.orders.length > 0 &&
                item.orders[0].deals &&
                item.orders[0].deals.length > 0
            ) {
                inboxItem.dealid = item.orders[0].deals[0].id;
                if (IS_DEBUG) console.log("item.orders[0].deals[0].startTime", Number(item.orders[0].deals[0].startTime));
                inboxItem.downloadDate = new Date(Number(item.orders[0].deals[0].startTime) * 1000);
                inboxItem.status = "ACTIVE";

                if (item.orders[0].deals[0].tasks && item.orders[0].deals[0].tasks.length > 0) {
                    inboxItem.status = item.orders[0].deals[0].tasks[0].status;
                    inboxItem.taskid = item.orders[0].deals[0].tasks[0].id;
                }
            }
            return inboxItem
        }

    }));

    mapped = mapped.filter((item) => {
        return null != item && item.to && item.to.toLowerCase() === connectedAccount;
    })


    await ensLookup(mapped) ; 

    if (IS_DEBUG) console.log("mapped", mapped);

    return mapped;
}


export const countPendingInboxItems = async (connectedAccount, structuredResponseItems) => {
   
    let mapped = await mapInboxOrders (connectedAccount, structuredResponseItems) ; 

    let pendingInboxItem = mapped.filter((item) => {
        return  !item.taskid || item.taskid == "";
    }) ; 

    return pendingInboxItem.length ;
}



export const mapSentItemsOrders = async (connectedAccount, structuredResponseItems) => {
    let iexec = getIexec();
    if (IS_DEBUG) console.log("structuredResponseItems", structuredResponseItems);
    let mapped = await Promise.all(structuredResponseItems.map(async (item) => {

        var inboxItem = inboxItemStruct(item.id, item.name, item.owner.id);

        if (IS_DEBUG) console.log("DATASET ID", item.id);
        let ds = await iexec.dataset.showDataset(item.id);

        console.log("SHOWN DATASET", ds, item.id, item.name);

        let requester = "0x0000000000000000000000000000000000000000";

        if (item.name.indexOf('#') > -1) {

            let foundRequest = item.name.split('#')[1].toLowerCase();


            let regExMatch = foundRequest.match(/(\b0x[a-f0-9]{40}\b)/g)
            if (IS_DEBUG) console.log("GRRRRR", item.name, foundRequest, regExMatch);

            if (regExMatch && regExMatch.length > 0) {
                requester = regExMatch[0];
            }
            if (IS_DEBUG) console.log("requster", requester);
        }

        let options = {
            requester: requester,
            app: ace.APP_ADDRESS
            , minTag: ace.TEE_TAG,
            maxTag: ace.TEE_TAG
        };

        if (IS_DEBUG) console.log("OPTIONS", options);

        var orderBook = await iexec.orderbook.fetchDatasetOrderbook(item.id, options);

        if (IS_DEBUG) console.log("ORDER BOOK", orderBook);

        if (orderBook && orderBook.orders.length > 0) {

            inboxItem.status = orderBook.orders[0].status;
            inboxItem.to = orderBook.orders[0].order.requesterrestrict;
            inboxItem.orderHash = orderBook.orders[0].orderHash;
            inboxItem.sendDate = new Date(orderBook.orders[0].publicationTimestamp);
            inboxItem.price = orderBook.orders[0].order.datasetprice;
            inboxItem.tag = orderBook.orders[0].order.tag;
            inboxItem.workerpoolrestrict = orderBook.orders[0].order.workerpoolrestrict;


            if (item.orders &&
                item.orders.length > 0 &&
                item.orders[0].deals &&
                item.orders[0].deals.length > 0
            ) {

                inboxItem.dealid = item.orders[0].deals[0].id;
                if (IS_DEBUG) console.log("item.orders[0].deals[0].startTime", Number(item.orders[0].deals[0].startTime));
                inboxItem.downloadDate = new Date(Number(item.orders[0].deals[0].startTime) * 1000);
                inboxItem.status = "ACTIVE";

                if (item.orders[0].deals[0].tasks && item.orders[0].deals[0].tasks.length > 0) {
                    inboxItem.status = item.orders[0].deals[0].tasks[0].status;
                    inboxItem.taskid = item.orders[0].deals[0].tasks[0].id;
                }
            }
            return inboxItem
        }

    }));

    mapped = mapped.filter((item) => {
        return null != item && item.from && item.from.toLowerCase() === connectedAccount;
    })

    await ensLookup(mapped) ; 

    if (IS_DEBUG) console.log("mapped", mapped);

    return mapped;
}
