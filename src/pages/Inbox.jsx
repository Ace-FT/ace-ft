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

  const WAITING_FOR_REQUEST = 0;
  const REQUESTING = 1;
  const READY_FOR_DOWNLOAD = 2;
  const STATUS_OPEN_ORDER = "open";
  const STATUS_COMPLETED_ORDER = "COMPLETED";
  const STATUS_ACTIVE_ORDER = "ACTIVE";
  const query = inboxDatasetsQuery(null, connectedAccount);
  const IS_DEBUG = process.env.REACT_APP_IS_DEBUG == 'true';
  const [data, setData] = useState(false);

  useRequest(
    ( async ()=>{
      let ret = await fetchData(query) ;
      if (IS_DEBUG) console.log("Calling fectdata", ret) ; 
      setData(ret.data) ;
    }), 
    
    { pollingInterval: ace.POLLING_INTERVAL }
  );


  if (IS_DEBUG) console.log("QUERY", query, "POLLING_INTERVAL", ace.POLLING_INTERVAL);

  //const { data } = useRequest(query);


  const [isReadyForDownload] = useState(false);

  var structuredResponse = null;

  const [inboxItems, setInboxItems] = useState();
  const [taskID, setTaskID] = useState("");


  useEffect(() => { }, [connectedAccount])

  useEffect(() => {
    const doMapping = async () => {
      setInboxItems(await mapInboxOrders(connectedAccount, structuredResponse));
      if(IS_DEBUG) console.log("INBOX ITEMS SET");
    };

    if (data) {
      structuredResponse = structureResponse(data);
      if (IS_DEBUG) console.log("structuredResponse", structuredResponse);

      doMapping();
      return;
    }
  }, [data]);

  useEffect(() => {
    if (inboxItems) {
      if(IS_DEBUG) console.log("inboxItems===>", inboxItems);
    }
  }, [inboxItems]);

  useEffect(() => { }, [taskID]);

  return (
    <>
      <Helmet>
        <title>{APP_NAME} | Inbox</title>
      </Helmet>
      <div className="mx-8 py-m">
        <h1 className="table-title">Inbox</h1>

        <ReactTooltip />

        <table className="container w-full max-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="text-center">Received date</th>
              <th className="text-center">From</th>
              <th className="text-center invisible-element">Price (in RLC)</th>
              <th className="text-center">Status</th>
              <th className="text-center px-8">&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {inboxItems && inboxItems.length > 0 ? (
              inboxItems
                .sort((a, b) => b.sendDate - a.sendDate)
                .map((inboxItem, i) => {
                  return (
                    <tr className="text-center" key={i}>
                      <td>{formatDate(inboxItem.sendDate)}</td>
                      <td>{inboxItem.from}</td>
                      <td className="invisible-element">{inboxItem.price}</td>
                      <td>
                        {inboxItem.status === STATUS_OPEN_ORDER && (
                          <p>
                            <button
                              className="btn h-6"
                              onClick={async () => {
                                await requestDataset(inboxItem.id, connectedAccount);
                                //window.location.reload(false);
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
                              if (IS_DEBUG) console.log("resultFileUrl", resultFileUrl);
                              if (IS_DEBUG) console.log("resultFileKey", resultFileKey);
                              if (IS_DEBUG) console.log("resultFileName", resultFileName);
                              var ok = false;
                              document.body.style.cursor = 'wait';
                              let trycount = 0;

                              while (!ok && trycount < 50) {
                                ok = await checkFileAvailability(resultFileUrl, () => console.log("checking ended...")); //fileUrl
                                if (IS_DEBUG) console.log("ok 1", ok, resultFileUrl);
                                if (!ok) {
                                  await delay(2);
                                  ok = await checkFileAvailability(resultFileUrl, () => console.log("checking ended...")); //fileUrl
                                  if (IS_DEBUG) console.log("ok 2", ok, resultFileUrl);

                                  trycount++;
                                  resultFileUrl = getNextIpfsGateway(resultFileUrl, trycount);// await useNextIpfsGateway(resultFileUrl, trycount); 
                                  if (IS_DEBUG) console.log("next  resultFileUrl", resultFileUrl, "trycount", trycount);
                                }
                              }
                              if (ok) {
                                const fileObject = await fetchFromFileToDownloadableFileObject(resultFileUrl);
                                let decryptedFile = fromEnryptedFileToFile(fileObject, resultFileKey);
                                let fileBlob = new Blob([decryptedFile], { type: 'application/octet-stream' });
                                saveFile(fileBlob, resultFileName);
                              }
                              else {
                                alert("Could not download file. Please try again");
                              }
                              document.body.style.cursor = 'default';

                            }}>
                              Download
                            </button>
                          </p>
                        )}
                      </td>
                      <td className="text-center">
                        <ReactTooltip />
                        <svg xmlns="http://www.w3.org/2000/svg"
                          data-tip="View in iExec explorer"
                          fill="none" viewBox="0 0 24 24"
                          stroke-width="1.5"
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
