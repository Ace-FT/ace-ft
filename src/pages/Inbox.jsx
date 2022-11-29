import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { AceContext } from "../context/context";
import { IExec } from "iexec";
import useRequest from "../hooks/useRequest";
import * as ace from "../shared/constants";
import { inboxDatasetsQuery } from "../shared/queries.ts";
import structureResponse from "../utils/structureResponse";
import requestDataset from "./Inbox/requestDataset";
import { mapInboxOrders } from "../shared/itemMapper";
import JSZip from "jszip";
import downloadFile from "../utils/downloadFile";
import { getDatasetOrders } from "./Inbox/getOrders";
import { fromDatasetToFileJSON, fetchFromFileToDownloadableFileObject, saveFile } from "./Inbox/download";
import { fromEnryptedFileToFile } from "../utils/fileAESEncryption";
import formatDate from "../utils/formatDate";
import ReactTooltip from 'react-tooltip';
import { delay } from "../utils/delay";

const configArgs = { ethProvider: window.ethereum, chainId: 134 };
const configOptions = { smsURL: ace.SMS_URL };
const iexec = new IExec(configArgs, configOptions);

function Inbox() {
  const { ethereum } = window;
  const { connectedAccount, checkFileAvailability } = useContext(AceContext);

  const WAITING_FOR_REQUEST = 0;
  const REQUESTING = 1;
  const READY_FOR_DOWNLOAD = 2;
  const STATUS_OPEN_ORDER = "open";
  const STATUS_COMPLETED_ORDER = "COMPLETED";
  const STATUS_ACTIVE_ORDER = "ACTIVE";

  const query = inboxDatasetsQuery(null, connectedAccount);
  console.log("QUERY", query);

  const { data } = useRequest(query);

  const [renders, setRendered] = useState(false);
  const [isReadyForDownload] = useState(false);

  var structuredResponse = null;

  setInterval(() => {
    window.location.reload(false);
  }, ace.TIME_BEFORE_AUTO_REFRESHING_INBOX);

  const [inboxItems, setInboxItems] = useState();
  const [taskID, setTaskID] = useState("");

  useEffect(() => {
    const doMapping = async () => {
      setInboxItems(await mapInboxOrders(connectedAccount, structuredResponse));
      console.log("INBOX ITEMS SET");
    };

    if (data) {
      structuredResponse = structureResponse(data);
      console.log("structuredResponse", structuredResponse);

      doMapping();
      setRendered(true);
      return;
    }
  }, [data]);

  useEffect(() => {
    if (inboxItems) {
      console.log("inboxItems===>", inboxItems);
    }
  }, [inboxItems]);

  useEffect(() => {}, [taskID]);

  const verifyIfReadyForDownload = (datasetOrder) => {
    if (
      datasetOrder.deals &&
      datasetOrder.deals[0] &&
      datasetOrder.deals[0].tasks &&
      datasetOrder.deals[0].tasks[0] &&
      datasetOrder.deals[0].tasks[0].status
    ) {
      return datasetOrder.deals[0].tasks[0].status === "COMPLETED";
    }
    return false;
  };

  const getAppOrder = async (appAddress) => {
    const { count, orders } = await iexec.orderbook.fetchAppOrderbook(
      appAddress,
      {
        workerpool: ace.WORKERPOOL_ADDRESS,
      }
    );
    console.log("total orders:", count);
    console.log("App orders:", orders);
    console.log("One order:", orders[0]);
    return orders[0];
  };

  const getWorkerpoolOrder = async () => {
    const { orders } = await iexec.orderbook.fetchWorkerpoolOrderbook({
      workerpool: ace.WORKERPOOL_ADDRESS,
      category: 0,
      minTag: ace.TEE_TAG,
      maxTag: ace.TEE_TAG,
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
        maxTag: ace.TEE_TAG,
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
      workerpool: ace.WORKERPOOL_ADDRESS,
    });
    // console.log("app\n", app);
    console.log("My request orders", myRequestOrders);
    return myRequestOrders;
  };


  const getNextIpfsGateway = (ipfsUrl, trycount) => {
    var parts = ipfsUrl.split('/ipfs') ; 
    console.log("parts", parts) ; 

    const gateways = process.env.REACT_APP_IPFS_GATEWAYS.split(',') ;

    let numNext = trycount % gateways.length 
    let nextUrl = gateways[numNext] + parts[1] ;
    console.log("gateways", gateways, "numNext", numNext, "nextUrl", nextUrl) ;


    return nextUrl ; 

  }

  
  return (
    <>
      <Helmet>
        <title>ACE-ft | Inbox</title>
      </Helmet>
      <div className="mx-8 py-m">
        <h1 class="table-title">Inbox</h1>
        {/* <button
          className="rounded-md bg-white text-black px-6 py-2"
          onClick={async () => {
            getDatasetOrder();
          }}
        >
          Data set orders
        </button> */}

        {/* <button
          className="rounded-r-md bg-white text-black px-6 py-2"
          onClick={async () => {
            //const deal = await iexec.deal.show(dealId)
          
            const resp = await iexec.task.fetchResults("0x33af944de7330aadf4b49b2f89d0200e3d4f63104f55a8495a714186d9fd70e7") // fetch task id from table here
            console.log(resp);
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
              return response.arrayBuffer(); //to convert to UintArray8
            })
            console.log("The encrypted received file is\n", responseArray)
            // let fileName = task.taskid;
            // fileName = fileName.substring(0, 22)
            // console.log("filename", fileName);
            // downloadFile(responseArray, fileName);
          }}
        >
          Download file (after running task)
        </button> */}

        <ReactTooltip />

        <table className="container w-full max-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="text-center">Received date</th>
              <th className="text-center">From</th>
              <th className="text-center">Price (in RLC)</th>
              <th className="text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {inboxItems ? (
              inboxItems
                .sort((a, b) => b.sendDate - a.sendDate)
                .map((inboxItem, i) => {
                  return (
                    <tr className="text-center" key={i}>
                      <td>{formatDate(inboxItem.sendDate)}</td>
                      <td>{inboxItem.from}</td>
                      <td>{inboxItem.price}</td>
                      <td>
                        {inboxItem.status === STATUS_OPEN_ORDER && (
                          <p>
                            <button
                              className="btn h-6"
                              onClick={async () => {
                                await requestDataset(inboxItem.id, connectedAccount);
                                window.location.reload(false);
                              }}
                            >
                              Request
                            </button>
                          </p>
                        )}
                        {inboxItem.status === STATUS_ACTIVE_ORDER &&
                        (function() {
                          setInterval(async () => {
                            console.log(data);
                            if (data) {
                              structuredResponse = structureResponse(data);
                            }
                            setInboxItems(await mapInboxOrders(connectedAccount,structuredResponse));
                          }, ace.TIME_BEFORE_AUTO_REFRESHING_INBOX)
                          
                          return (<p>
                            Request started on {formatDate(inboxItem.downloadDate)}
                          </p>)}
                        )
                      }
                      {
                        inboxItem.status === STATUS_COMPLETED_ORDER && (
                          <p>
                            <button className="btn h-6" onClick={async () => {
                              const resultFile = await fromDatasetToFileJSON(inboxItem.taskid);
                              let resultFileUrl = resultFile.url;
                              const resultFileKey = resultFile.key;
                              const resultFileName = resultFile.name;
                              console.log("resultFileUrl", resultFileUrl)
                              console.log("resultFileKey", resultFileKey);
                              console.log("resultFileName", resultFileName);
                              var ok = false;
                              document.body.style.cursor = 'wait';
                              let trycount = 0 ;

                              while (!ok) {
                                ok = await checkFileAvailability(resultFileUrl, () => console.log("checking ended...") ); //fileUrl
                                console.log(ok);
                                if (!ok)
                                {
                                  await delay(2) ;
                                  ok = await checkFileAvailability(resultFileUrl, () => console.log("checking ended...") ); //fileUrl

                                  trycount++ ;
                                  resultFileUrl = getNextIpfsGateway(resultFileUrl,trycount) ;// await useNextIpfsGateway(resultFileUrl, trycount); 
                                }
                              }
                              const fileObject = await fetchFromFileToDownloadableFileObject(resultFileUrl);
                              let decryptedFile = fromEnryptedFileToFile(fileObject, resultFileKey);
                              let fileBlob = new Blob([decryptedFile], { type: 'application/octet-stream' });
                              document.body.style.cursor = 'default'; 
                              saveFile(fileBlob, resultFileName);
                            }}>
                              Download
                            </button>
                          </p>
                        )}
                      </td>
                    </tr>
                  );
                })
            ) : (
              <tr class="text-center">
                <td colSpan={4}>You have no pending files in your inbox.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Inbox;
