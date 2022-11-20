import React, { useContext, useEffect, useState } from "react";
import { AceContext } from "../context/context";
import { IExec } from "iexec";
import { create } from 'ipfs-http-client'
import useRequest from "../hooks/useRequest";
import * as ace from "../shared/constants";
import { requestQueryOnApp } from "../shared/queries";
import structureResponse from "../utils/structureResponse";
import requestDataset from "./Inbox/requesting";
import { getDatasetOrders } from "./Inbox/getOrders";
import downloadFile from "./Inbox/download";


const Inbox = () => {
  const { ethereum } = window;
  const configArgs = { ethProvider: window.ethereum,  chainId : 134};
  const configOptions = { smsURL: 'https://v7.sms.debug-tee-services.bellecour.iex.ec' };
  const iexec = new IExec(configArgs, configOptions);
  const { connectedAccount } = useContext(AceContext);
  console.log(connectedAccount);
  const queryType = "INBOX";
  const query = requestQueryOnApp(queryType, connectedAccount);
  console.log(query)

  const WAITING_FOR_REQUEST = 0;
  const REQUESTING = 1;
  const READY_FOR_DOWNLOAD = 2;

  const { data, loading, error } = useRequest(query);
  const [renders, setRendered] = useState(false);
  const [allData, setAllData] = useState();
  const [step, setStep] = useState(WAITING_FOR_REQUEST)
  const [isReadyForDownload] = useState(false)
  var structuredResponse = null;


  var taskId = "";

  useEffect(() => {
    if (data) {
      console.log(data);
      structuredResponse = structureResponse(data);
      //structuredResponse = structureResponse(data);
      console.log("structuredResponse", structuredResponse);
      if (structuredResponse) {
        console.log("dataset details", structuredResponse[0]);
      }
      //console.log("One dataset", structuredResponse[0].dataset.name)
      setAllData(structuredResponse);
      setRendered(true);
    }
  }, [data]);

  useEffect(() => {

  }, [step])

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
      "0xc6d219d62a667264946fe6133b31495ae3cce2ea",
      {
        app: appAddress,
        requester: connectedAccount,
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
          var zipInstance = new JSZip()
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
            resultFileUrl,
            {method: 'GET'}
          ).then(
            response => {
              return response.arrayBuffer();
            }
          )
          console.log("The encrypted received file is\n", responseArray)
          let fileName = task.taskid;
          fileName = fileName.substring(0, 22)
          console.log("filename", fileName);
          downloadFile(responseArray, fileName);
        }}
      >
        Download file (after running task)
      </button>

      {allData ? (
        <table className="w-full border-collapse max-w-full rounded-2xl shadow-xl bg-white text-black table-auto">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="border-r border-gray-200 py-3">Received date</th>
              <th className="border-r border-gray-200 py-3">From</th>
              <th className="border-r border-gray-200 py-3">Name</th>
              <th className="border-r border-gray-200 py-3">Price (in RLC)</th>
              <th className="px-3">Downloaded</th>
            </tr>
          </thead>
          <tbody>
            {allData.map((datasetOrder, i) => {
              console.log(allData);
              console.log(datasetOrder);

              const needsToBeRequested = !(datasetOrder.deals && datasetOrder.deals[0] && datasetOrder.deals[0].tasks)
              var isCompleted =
                datasetOrder.deals &&
                datasetOrder.deals[0] &&
                datasetOrder.deals[0].tasks &&
                datasetOrder.deals[0].tasks[0] &&
                datasetOrder.deals[0].tasks[0].status === "COMPLETED";
              return (
                <tr className="text-center border-b border-gray-200" key={i}  >
                  <td className="border-r border-gray-200 p-3">
                    {datasetOrder.dataset.timestamp}
                  </td>
                  <td className="border-r border-gray-200 p-3">
                    {datasetOrder.dataset.owner.id}
                  </td>
                  <td className="border-r border-gray-200 p-3">
                    {datasetOrder.dataset.name}
                  </td>
                  <td className="border-r border-gray-200 p-3">
                    {datasetOrder.datasetprice}
                  </td>
                  <td className="border-r border-gray-200 p-3">
                    <p>
                      {
                        step === READY_FOR_DOWNLOAD
                        ? (
                          <button>Download</button>
                        )
                        : (
                          needsToBeRequested && step === WAITING_FOR_REQUEST
                          ? <button onClick={async (e) => {
                              e.preventDefault()
                              const datasetId = datasetOrder.dataset.id;
                              await requestDataset(datasetId, connectedAccount)
                              setStep(REQUESTING)
                              }}
                            >
                              Request
                            </button>
                          : 
                          setTimeout(() => {
                              isCompleted = verifyIfReadyForDownload(datasetOrder)
                              if (isCompleted) {
                                setStep(READY_FOR_DOWNLOAD)
                              }
                            }, 15000)
                        )
                      }
                    </p>
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
