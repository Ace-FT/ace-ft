import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { AceContext } from "../context/context";
import { IExec } from "iexec";
import useRequest from "../hooks/useRequest";
import * as ace from "../shared/constants";
import { inboxDatasetsQuery } from "../shared/queries.ts";

import structureResponse from "../utils/structureResponse";
import requestDataset from "./Inbox/requestDataset";
import { mapSentItemsOrders } from "../shared/itemMapper";
import formatDate from "../utils/formatDate";
import ReactTooltip from 'react-tooltip';
import { openExplorer } from "../utils/openExplorer";

const IS_DEBUG = process.env.REACT_APP_IS_DEBUG == 'true';

const SentItems = () => {
  const { ethereum } = window;
  const configArgs = { ethProvider: window.ethereum, chainId: 134 };
  const configOptions = { smsURL: 'https://v7.sms.debug-tee-services.bellecour.iex.ec' };
  const iexec = new IExec(configArgs, configOptions);
  const { connectedAccount } = useContext(AceContext);

  const WAITING_FOR_REQUEST = 0;
  const REQUESTING = 1;
  const READY_FOR_DOWNLOAD = 2;
  const STATUS_OPEN_ORDER = "open";
  const STATUS_COMPLETED_ORDER = "COMPLETED";
  const STATUS_ACTIVE_ORDER = "ACTIVE";


  const query = inboxDatasetsQuery(connectedAccount, null);


  console.log("QUERY", query);

  const { data, loading, error } = useRequest(query);
  const [renders, setRendered] = useState(false);

  const [isReadyForDownload] = useState(false)
  var structuredResponse = null;

  const [inboxItems, setInboxItems] = useState();

  useEffect(() => {

    const doMapping = async () => {
      setInboxItems(await mapSentItemsOrders(connectedAccount, structuredResponse));
      console.log("INBOX ITEMS SET");
    }

    if (data && !renders) {
      setRendered(true);
      structuredResponse = structureResponse(data);
      console.log("structuredResponse", structuredResponse);

      doMapping();
      return;

    }
  }, [data]);


  useEffect(() => {
    if (inboxItems) {
      console.log("inboxItems===>", inboxItems);
    }
  }, [inboxItems])


  const verifyIfReadyForDownload = (datasetOrder) => {
    if (
      datasetOrder.deals && datasetOrder.deals[0] &&
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
    <>
      <Helmet>
        <title>ACE-ft | Sent items</title>
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
                console.log("INBOX ITEM", inboxItem);
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
                              className="w-5 h-5 redirectLink"
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
              <td colSpan={4}>No sent item found.</td>
              </tr>
            
        )}
          </tbody>
        </table>
      </div>
    </>

  );
};

export default SentItems;
