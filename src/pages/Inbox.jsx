import React, { useContext, useEffect, useState } from "react";
import { AceContext } from "../context/context";
import { IExec } from "iexec";
import { create } from 'ipfs-http-client'
import useRequest from "../hooks/useRequest";
import * as ace from "../shared/constants";
import { inboxDatasetsQuery } from "../shared/queries.ts";
import structureResponse from "../utils/structureResponse";
import requestDataset from "./Inbox/requesting";
import {mapInboxOrders} from "../shared/itemMapper";
import JSZip from "jszip";
import downloadFile from "./Inbox/download";
import {getDatasetOrders} from "./Inbox/getOrders";


function Inbox() {
  const { ethereum } = window;
  const configArgs = { ethProvider: window.ethereum,  chainId : 134};
  const configOptions = { smsURL: 'https://v7.sms.debug-tee-services.bellecour.iex.ec' };
  const iexec = new IExec(configArgs, configOptions);
  const { connectedAccount } = useContext(AceContext);


  const WAITING_FOR_REQUEST = 0;
  const REQUESTING = 1;
  const READY_FOR_DOWNLOAD = 2;
  const STATUS_OPEN_ORDER = "open";
  const STATUS_COMPLETED_ORDER = "COMPLETED";
  const STATUS_ACTIVE_ORDER = "ACTIVE";


  const query = inboxDatasetsQuery(null, connectedAccount) ;


  console.log("QUERY", query) ; 

  const { data, loading, error } = useRequest(query);

  const [renders, setRendered] = useState(false);
  const [isReadyForDownload] = useState(false)
  var structuredResponse = null;
  

  var taskId = "";

  const [inboxItems, setInboxItems] = useState();

  useEffect(() => {

    const doMapping = async () => {
      setInboxItems (await mapInboxOrders(connectedAccount, structuredResponse)) ; 
      console.log("INBOX ITEMS SET") ;
    }

    if (data) {
      structuredResponse = structureResponse(data);
      console.log("structuredResponse", structuredResponse) ;

      doMapping();
      setRendered(true);
      return ; 

    }
  }, [data]);


  useEffect(() => {
    if (inboxItems) {
      console.log("inboxItems===>", inboxItems) ;
    }
  }, [inboxItems])


  const verifyIfReadyForDownload = (datasetOrder) => {
      if (
        datasetOrder.deals &&datasetOrder.deals[0] &&
        datasetOrder.deals[0].tasks &&
        datasetOrder.deals[0].tasks[0] &&
        datasetOrder.deals[0].tasks[0].status
      ) {
        return datasetOrder.deals[0].tasks[0].status === "COMPLETED"
      }
      return false;
  }


  const getAppOrder = async (appAddress) => {
    const { count, orders } = await iexec.orderbook.fetchAppOrderbook(
      appAddress,
      {
        workerpool: ace.WORKERPOOL_ADDRESS
      }
    );
    console.log('total orders:', count);
    console.log("App orders:", orders);
    console.log("One order:", orders[0]);
    return orders[0];
  };

  const getWorkerpoolOrder = async () => {
    const { orders } = await iexec.orderbook.fetchWorkerpoolOrderbook({
      workerpool: ace.WORKERPOOL_ADDRESS,
      category: 0,
      minTag:"0x0000000000000000000000000000000000000000000000000000000000000001",
      maxTag:"0x0000000000000000000000000000000000000000000000000000000000000001"
    });
    console.log("Workerpool orders", orders);
    console.log("One workerpool order", orders[0]);
    return orders[0];
  };

  /**
   * Gets the datasets from the orderbook
   * @param {string} appAddress the address of the app you want to get the orderbook from
   * @returns The first dataset order from the orderbook
   */
  const getDatasetOrder = async (appAddress) => {
    const { orders } = await iexec.orderbook.fetchDatasetOrderbook(
      "0xA102d202e7947d7F27eA0Bf618Acb2CE600841f8",
      {
        app: ace.APP_ADDRESS,
        requester: "0xc340e71bbea215deb351d573fcf340bf3e01db97",
        minTag: ace.TEE_TAG,
        maxTag: ace.TEE_TAG
      }
    );
    console.log("dataset orders", orders);
    console.log("One dataset order", orders[0]);
    return orders[0];
  };

  const fetchMyRequestOrders = async () => {
    // const { app } = await iexec.app.showApp(
    //   ace.APP_ADDRESS
    // );

    const { myRequestOrders } = await iexec.orderbook.fetchRequestOrderbook({
      app: ace.APP_ADDRESS,
      requester: connectedAccount,
      workerpool: ace.WORKERPOOL_ADDRESS
    });
    // console.log("app\n", app);
    console.log("My request orders", myRequestOrders);
    return myRequestOrders;
  };


  return (
    <div className="mt-16 mx-8">
      <h1>This is the Inbox page</h1>
      <button
        className="rounded-md bg-white text-black px-6 py-2"
        onClick={async () => {
          getDatasetOrder();
        }}
      >
        Data set orders
      </button>

      <button
        className="rounded-md bg-white text-black px-6 py-2"
        onClick={async () => {
          getAppOrder(ace.APP_ADDRESS);
          fetchMyRequestOrders();
          await iexec.dataset.encrypt
        }}
      >
        Get app orders
      </button>
      <button
        className="rounded-md bg-white text-black px-6 py-2"
        onClick={async () => {
          getDatasetOrders("0xbfF6ae401e7202ea9bC006B17F6dc4bD5264De39", connectedAccount) // fetch dataset address from table here
        }}
      >
        Get my dataset orders for me
      </button>
      <button
        className="rounded-r-md bg-white text-black px-6 py-2"
        onClick={async () => taskId = await requestDataset("0xbfF6ae401e7202ea9bC006B17F6dc4bD5264De39", connectedAccount)} // fetch dataset address from table here
      >
        Run task
      </button>
      <button
        className="rounded-r-md bg-white text-black px-6 py-2"
        onClick={async () => {
          //console.log("Task id (check before fetching)\n", "0xa72f778db41aee44cf782d91c534d34849588f12b8feef2853d010677fe253a1")
          const task = await iexec.task.show("0x33af944de7330aadf4b49b2f89d0200e3d4f63104f55a8495a714186d9fd70e7") // fetch task id from table here
          console.log('task show:\n', task);
          const dealId = task.dealid
          const deal = await iexec.deal.show(dealId)
        
          const resp = await iexec.task.fetchResults("0x33af944de7330aadf4b49b2f89d0200e3d4f63104f55a8495a714186d9fd70e7") // fetch task id from table here
          console.log(resp)
          const url = await resp.url;
          console.log(url);
          const binary = await resp.blob();
          console.log("Response binary", binary);
          var zipInstance = new JSZip();
          var resultFile = await zipInstance.loadAsync(binary).then((zip) => {
            return zip.file("result.json").async("string")
          })
          
          resultFile = JSON.parse(resultFile)
          console.log("resultFile", resultFile)
          const resultFileUrl = resultFile.url
          const resultFileKey = resultFile.key

          console.log(resultFileUrl)
          console.log("resultFileKey", resultFileKey)
          const responseArray = await fetch(
            resultFileUrl, {method: 'GET'}
          ).then(response => {
            return response.arrayBuffer();
          })
          console.log("The encrypted received file is\n", responseArray)
          let fileName = task.taskid;
          fileName = fileName.substring(0, 22)
          console.log("filename", fileName);
          downloadFile(responseArray, fileName);
        }}
      >
        Download file (after running task)
      </button>

      {inboxItems ? (
        <table className="w-full border-collapse max-w-full rounded-2xl shadow-xl bg-white text-black table-auto">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="border-r border-gray-200 py-3">Received date</th>
              <th className="border-r border-gray-200 py-3">From</th>
              <th className="border-r border-gray-200 py-3">Price (in RLC)</th>
              <th className="px-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {inboxItems.map((inboxItem, i) => {
              console.log("INBOX ITEM", inboxItem)  ;   
              return (
                <tr className="text-center border-b border-gray-200" key={i}  >
                  <td className="border-r border-gray-200 p-3">
                    {inboxItem.sendDate.toString()}
                  </td>
                  <td className="border-r border-gray-200 p-3">
                    {inboxItem.from}
                  </td>
                  <td className="border-r border-gray-200 p-3">
                    {inboxItem.price}
                  </td>
                  <td className="border-r border-gray-200 p-3">
                  {
                    inboxItem.status === STATUS_OPEN_ORDER 
                    ? <p>
                        <button onClick={async () => { await requestDataset(inboxItem.id, connectedAccount)}}>Request</button>
                      </p> 
                    : ""
                  }
                  {
                    inboxItem.status === STATUS_COMPLETED_ORDER 
                    ? <p>
                        Downloaded on {inboxItem.downloadDate.toString()}
                      </p> 
                    : ""
                  }     
                  {
                    inboxItem.status === STATUS_ACTIVE_ORDER 
                    ? <p>
                        Download started at {inboxItem.downloadDate.toString()}
                      </p> 
                    : ""
                  }

                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="w-full border-collapse max-w-full rounded-2xl shadow-xl bg-white text-black">
          You have no pending files in your inbox.
        </div>
      )}
    </div>
  );
};

export default Inbox;
