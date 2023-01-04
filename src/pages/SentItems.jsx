import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { AceContext } from "../context/context";
import * as ace from "../shared/constants";
import { inboxDatasetsQuery } from "../shared/queries.ts";
import { useRequest } from 'ahooks';
import structureResponse from "../utils/structureResponse";
import { mapSentItemsOrders } from "../shared/itemMapper";
import formatDate from "../utils/formatDate";
import ReactTooltip from 'react-tooltip';
import { openExplorer } from "../utils/openExplorer";
import fetchData from "../shared//fetchData";
const APP_NAME = process.env.REACT_APP_NAME;
const IS_DEBUG = process.env.REACT_APP_IS_DEBUG == 'true';

const SentItems = () => {

  const { connectedAccount } = useContext(AceContext);

  const WAITING_FOR_REQUEST = 0;
  const REQUESTING = 1;
  const READY_FOR_DOWNLOAD = 2;
  const STATUS_OPEN_ORDER = "open";
  const STATUS_COMPLETED_ORDER = "COMPLETED";
  const STATUS_ACTIVE_ORDER = "ACTIVE";


  const query = inboxDatasetsQuery(connectedAccount, null);

  const [data, setData] = useState(false);
  const [isLoading, setIsLoading] = useState(true) ;
  


  useRequest(
    ( async ()=>{
      setIsLoading(true) ;
      let ret = await fetchData(query) ;
      if (IS_DEBUG) console.log("Calling fectdata", ret) ; 
      setData(ret.data) ;
    }), 
    
    { pollingInterval: ace.POLLING_INTERVAL }
  );

  
  
  const [isReadyForDownload] = useState(false)
  var structuredResponse = null;

  const [inboxItems, setInboxItems] = useState();

  useEffect(() => {
    console.log("sentitems user effects ! ", data) ; 
    const doMapping = async () => {
      try
      {
        let foundItems = await mapSentItemsOrders(connectedAccount, structuredResponse)
        if (IS_DEBUG) console.log("INBOX ITEMS SET", foundItems);
        setInboxItems(foundItems);  
      }
      catch(exc)
      {
        console.error(exc)
      }
      finally
      {
        setIsLoading(false);
      }
      
    }

    if (data) {

      if (IS_DEBUG) console.log("useEffect data", data) ; 
      structuredResponse = structureResponse(data);
      if (IS_DEBUG) console.log("structuredResponse", structuredResponse);
      doMapping();
      return;
    }
  }, [data]);


  useEffect(() => {
    if (inboxItems) {
      if (IS_DEBUG) console.log("inboxItems===>", inboxItems);
    }
  }, [inboxItems])


  return (
    <>
      <Helmet>
        <title>{APP_NAME} | Sent items</title>
      </Helmet>
      <div className="py-m mx-8">
        <h1 class="table-title">Sent items</h1>

        <table className="w-full border-collapse max-w-full container table-auto">
          <thead>
            <tr>
              <th className="text-center">Send date</th>
              <th className="text-center">To</th>
              <th className="text-center invisible-element">Price (in RLC)</th>
              <th className="text-center">Status</th>
              <th className="text-center px-8">&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {inboxItems && inboxItems.length > 0 ? (

              inboxItems.sort((a, b) => b.sendDate - a.sendDate).map((inboxItem, i) => {
                return (
                  <tr class="text-center" key={i}>
                    <td>
                      {formatDate(inboxItem.sendDate)}
                    </td>
                    <td>
                      {inboxItem.to}
                    </td>
                    <td className="invisible-element">
                      {inboxItem.price}
                    </td>
                    <td>
                      {
                        inboxItem.status === STATUS_OPEN_ORDER ?
                          <p>
                            Pending
                          </p>
                          : ""
                      }
                      {
                        inboxItem.status === STATUS_COMPLETED_ORDER &&
                        <p>
                          Downloaded on {formatDate(inboxItem.downloadDate)}
                        </p>
                      }
                      {
                        inboxItem.status === STATUS_ACTIVE_ORDER &&
                        <p>
                          Download started on {formatDate(inboxItem.downloadDate)}
                        </p>
                      }
                    </td>
                    <td className="text-center">
                        <ReactTooltip/>
                        <svg  xmlns="http://www.w3.org/2000/svg"
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
              {isLoading ? (
                <td colSpan={4}>LOADING ...</td>
              ) : 
                <td colSpan={4}>No sent item found.</td>
              }
            </tr>
            
        )}
          </tbody>
        </table>
      </div>
    </>

  );
};

export default SentItems;
