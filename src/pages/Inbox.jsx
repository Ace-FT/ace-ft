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
        
        <ReactTooltip />

        <svg
          data-tip="hello world"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
          />
        </svg>

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
                          <p>
                            Request started on {formatDate(inboxItem.downloadDate)}
                          </p>
                      
                        }
                        {inboxItem.status === STATUS_COMPLETED_ORDER && (
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
