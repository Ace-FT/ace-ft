import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { AceContext } from "../context/context";
import { useRequest } from 'ahooks';
import * as ace from "../shared/constants";
import { inboxDatasetsQuery } from "../shared/queries.ts";
import fetchData from "../shared/fetchData";

import structureResponse from "../utils/structureResponse";
import requestDataset from "./Inbox/requestDataset";
import { mapInboxOrders } from "../shared/itemMapper";
import { fromDatasetToFileJSON, fetchFromFileToDownloadableFileObject, saveFile } from "./Inbox/download.js";
import { fromEnryptedFileToFile } from "../utils/fileAESEncryption";
import formatDate from "../utils/formatDate";
import ReactTooltip from 'react-tooltip';
import { delay } from "../utils/delay";
import { openExplorer } from "../utils/openExplorer";
const APP_NAME = process.env.REACT_APP_NAME;


function Inbox() {
  const { ethereum } = window;
  const { connectedAccount, checkFileAvailability, getNextIpfsGateway } = useContext(AceContext);

  const STATUS_OPEN_ORDER = "open";
  const STATUS_ACTIVE_ORDER = "ACTIVE";
  const STATUS_REVEALING_ORDER = "REVEALING";
  const STATUS_COMPLETED_ORDER = "COMPLETED";
  const query = inboxDatasetsQuery(null, connectedAccount);
  const IS_DEBUG = process.env.REACT_APP_IS_DEBUG === 'true';
  const [data, setData] = useState(false);
  const [isLoading, setIsLoading] = useState(true) ;
  const [isDownloading, setIsDownloading] = useState(false);
  const [currentDownloading, setCurrentDownloading] = useState("")

  useRequest(
    (async () => {

      setIsLoading(true);
      try
      {
        let ret = await fetchData(query) ;
        if (IS_DEBUG) console.log("Calling fecthdata for INBOX", ret) ; 
        setData(ret.data) ;
      }
      catch(exc)
      {
        console.error(exc) ;
      }
      finally
      {
       setIsLoading(false);
      }
      
    }), 
    
    { pollingInterval: ace.POLLING_INTERVAL }
  );

  if (IS_DEBUG) console.log("QUERY", query, "POLLING_INTERVAL", ace.POLLING_INTERVAL);


  const [isReadyForDownload] = useState(false);

  var structuredResponse = null;

  const [inboxItems, setInboxItems] = useState();
  const [taskID, setTaskID] = useState("");


  useEffect(() => { }, [connectedAccount])

  useEffect(() => { 
    console.log("isLoading", isLoading)

  }, [isLoading])


  useEffect(() => {
    const doMapping = async () => {
      try {
        setInboxItems(await mapInboxOrders(connectedAccount, structuredResponse));
        if(IS_DEBUG) console.log("INBOX ITEMS SET");  
      }
      catch(err) {
        console.error(err);
      }
      finally {
        setIsLoading(false);
      }      
    };

    if (data) {
      structuredResponse = structureResponse(data);
      if (IS_DEBUG) console.log("structuredResponse", structuredResponse);

      doMapping();
      return;
    }

  }, [data]);

  useEffect(() => {
    async function processEach() {
      if (inboxItems) {
        if(IS_DEBUG) console.log("inboxItems===>", inboxItems); 
        for (var i = 0; i < inboxItems.length; i++) {
          console.log(i, inboxItems[i])
          if (inboxItems[i].status === STATUS_COMPLETED_ORDER) {
            console.log("Get session storage", (inboxItems[i].taskid), sessionStorage.getItem(inboxItems[i].taskid))
            
            if (sessionStorage.getItem(inboxItems[i].taskid)) {
              sessionStorage.removeItem(inboxItems[i].taskid)
              await processDownload(inboxItems[i])
            }
          }
        }  
      }
    }
    processEach() 
  }, [inboxItems]);


  useEffect(() => { }, [taskID]);

  
  async function processDownload(inboxItem) {
    await delay(2)
    setIsDownloading(true);
    document.body.style.cursor = 'wait';
    setCurrentDownloading(inboxItem.taskid);
    const resultFile = await fromDatasetToFileJSON(inboxItem.taskid);
    let resultFileUrl = resultFile.url;
    const resultFileName = resultFile.fn;
    if(IS_DEBUG) console.log("resultFileUrl", resultFileUrl);
    if(IS_DEBUG) console.log("resultFileName", resultFileName);

    var ok = false;
    let trycount = 0;

    while(!ok && trycount < 50) {
      ok = await checkFileAvailability(resultFileUrl, () => console.log("checking ended...")); //fileUrl
      if(IS_DEBUG) console.log("ok 1", ok, resultFileUrl);
      if(!ok) {
        await delay(2);
        ok = await checkFileAvailability(resultFileUrl, () => console.log("checking ended...")); //fileUrl
        if(IS_DEBUG) console.log("ok 2", ok, resultFileUrl);

        trycount++;
        resultFileUrl = getNextIpfsGateway(resultFileUrl, trycount); // await useNextIpfsGateway(resultFileUrl, trycount); 
        if(IS_DEBUG) console.log("next  resultFileUrl", resultFileUrl, "trycount", trycount);
      }
    }

    if(ok) {
      const fileObject = await fetchFromFileToDownloadableFileObject(resultFileUrl);
      let decryptedFile = fromEnryptedFileToFile(fileObject);
      let fileBlob = new Blob([decryptedFile], {type: 'application/octet-stream'});
      saveFile(fileBlob, resultFileName);
    }
    else {
      alert("Could not download file. Please try again");
    }
    document.body.style.cursor = 'default';
    setIsDownloading(false);
    setCurrentDownloading("");
  }

  return (
    <>
      <Helmet>
        <title>{APP_NAME} | Inbox</title>
      </Helmet>
      <div className="page-container">
        <main className="w-full text-iexwhite">
          <div className="mx-8 py-m">
            <h1 className="table-title">Inbox</h1>

            <ReactTooltip />

            <table className="container w-full max-w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th className="text-center">Received date</th>
                  <th className="text-center">From</th>
                  <th className="text-center">Price (in RLC)</th>
                  <th className="text-center">Status</th>
                  <th className="text-center px-8">&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {inboxItems && inboxItems.length > 0 ? (
                  inboxItems
                    .sort((a, b) => b.sendTimestamp - a.sendTimestamp)
                    .map((inboxItem, i) => {
                      return (
                        <tr className="text-center" key={i}>
                          <td>{formatDate(inboxItem.sendTimestamp)}</td>
                          <td>{inboxItem.dataOwner}</td>
                          <td>{(parseInt(inboxItem.price)/10**9)}</td>
                          <td>
                            {inboxItem.status === STATUS_OPEN_ORDER && (
                              <p>
                                <button
                                  className="btn h-6"
                                  onClick={async () => {
                                    await requestDataset(inboxItem.id, connectedAccount, inboxItem.from, inboxItem.sendDate, inboxItem.price);
                                    localStorage.setItem(`${inboxItem.taskid}`, `loading`)
                                    //window.location.reload(false);
                                  }}
                                >
                                  Request
                                </button>
                              </p>
                            )}
                            {inboxItem.status === STATUS_ACTIVE_ORDER &&
                            (
                            <>
                              <p>
                                Request started on {formatDate(inboxItem.downloadTimestamp)}
                              </p>
                              {/* <div className="w-full bg-gray-200 rounded-full">
                                <div id={inboxItem.taskid} className="pgbr bg-iexyellow text-base font-medium text-iexblk text-center p-0.5 leading-none mt-2" style={{width: `10%`}}>10%</div>
                              </div>                           */}
                              {console.log(new Date().getTime(), inboxItem.downloadTimestamp.getTime())}
                              {new Date().getTime() - inboxItem.downloadTimestamp.getTime() < 45000 ? (
                                <div className="w-full bg-gray-200 rounded-full">
                                  <div className="pgbr bg-iexyellow text-base font-medium text-iexblk text-center p-0.5 leading-none mt-2" style={{width: `17%`}}>17%</div>
                                </div>
                              ) : (
                                <div className="w-full bg-gray-200 rounded-full">
                                  <div className="pgbr bg-iexyellow text-base font-medium text-iexblk text-center p-0.5 leading-none mt-2" style={{width: `65%`}}>65%</div>
                                </div>
                              )}
                            </>     
                            )
                            }
                            {inboxItem.status === STATUS_REVEALING_ORDER && (
                            <>
                              <p>
                                Request started on {formatDate(inboxItem.downloadTimestamp)}
                              </p>
                              <div className="w-full bg-gray-200 rounded-full">
                                <div className="pgbr bg-iexyellow text-base font-medium text-iexblk text-center p-0.5 leading-none mt-2" style={{width: `90%`}}>90%</div>
                              </div>
                            </>     
                            )}
                            {inboxItem.status === STATUS_COMPLETED_ORDER && (
                            <>
                              {
                                (isDownloading && inboxItem.taskid === currentDownloading) ? (
                                  <p>Downloading file...</p>
                                ) : (
                                  <p>
                                    <button className="btn h-6" onClick={async () => await processDownload(inboxItem)}>
                                      Download
                                    </button>
                                  </p>
                                )  
                              }
                            </>
                            )}
                          </td>
                          <td className="text-center">
                            <ReactTooltip />
                            <svg xmlns="http://www.w3.org/2000/svg"
                              data-tip="View in iExec explorer"
                              fill="none" viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-5 h-5 clickable"
                              onClick={async () => {
                                openExplorer(inboxItem);
                              }}>
                              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                            </svg>
                          </td>
                        </tr>
                      );
                    })
                ) : (
                  <tr class="text-center">
                    {isLoading ? (
                      <td colSpan={5}>LOADING ...</td>
                    ) : 
                      <td colSpan={5}>You have no pending files in your inbox.</td>
                    }
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>

    </>
  );
}

export default Inbox;