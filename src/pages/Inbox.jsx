import React, { useContext, useEffect, useState } from "react";
import { AceContext } from "../context/context";
import { IExec } from "iexec";
import useRequest from "../hooks/useRequest";
import * as ace from "../shared/constants";
import { requestQueryOnApp } from "../shared/queries";
import structureResponse from "../utils/structureResponse";

const Inbox = () => {
  const { ethereum } = window;
  const configArgs = { ethProvider: window.ethereum,  chainId : 134};
  const configOptions = { smsURL: 'https://v7.sms.debug-tee-services.bellecour.iex.ec' };
  const iexec = new IExec(configArgs, configOptions);
  const { connectedAccount } = useContext(AceContext);
  console.log(connectedAccount);
  const queryType = "INBOX";
  const query = requestQueryOnApp(queryType, connectedAccount);

  const { data, loading, error } = useRequest(query);
  const [renders, setRendered] = useState(false);
  const [allData, setAllData] = useState();
  var structuredResponse = null;

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

  const getAppOrder = async (appAddress) => {
    const { orders } = await iexec.orderbook.fetchAppOrderbook(appAddress);
    console.log("App orders:", orders);
    console.log("One order:", orders[0]);
    return orders[0];
  };

  const getWorkerpoolOrder = async () => {
    const { orders } = await iexec.orderbook.fetchWorkerpoolOrderbook({
      category: 0,
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
      "0x8288d4F6C21Ad3aEB8fD7C87394aBFE84d197db8",
      {
        app: appAddress,
        requester: "0xdD2FD4581271e230360230F9337D5c0430Bf44C0",
      }
    );
    console.log("dataset orders", orders);
    console.log("One dataset order", orders[0]);
    return orders[0];
  };

  const fetchMyRequestOrders = async () => {
    // const { app } = await iexec.app.showApp(
    //   "0x2bd8FDFA9A2Fc441939402441EcFfc9F2De22eBd"
    // );

    const { myRequestOrders } = await iexec.orderbook.fetchRequestOrderbook({
      app: ace.APP_ADDRESS,
      requester: "0xdD2FD4581271e230360230F9337D5c0430Bf44C0",
    });
    // console.log(app);
    console.log("My request orders", myRequestOrders);
    return myRequestOrders;
  };

  const runDowloadTask = async () => {
    const isPushed = await iexec.storage.pushStorageToken("ipfs", {
      forceUpdate: true,
    });
    console.log(isPushed);

    const appOrder = getAppOrder(ace.APP_ADDRESS); // order on my app
    const workerpoolOrder = getWorkerpoolOrder();
    const datasetOrder = getDatasetOrder(ace.APP_ADDRESS);

    const myRequestOrder = await iexec.order.createRequestorder({
      app: ace.APP_ADDRESS,
      category: 0,
      dataset: "0x8288d4F6C21Ad3aEB8fD7C87394aBFE84d197db8",
      //params: { iexec_developer_logger: true },
    });

    console.log("Request order", myRequestOrder);
    const signedRequestOrder = await iexec.order.signRequestorder(
      myRequestOrder
    );
    console.log("Signed:", signedRequestOrder);

    console.log("-------------------------------------------");

    const { dealid, txHash } = await iexec.order.matchOrders({
      apporder: (await appOrder).order,
      datasetorder: (await datasetOrder).order,
      workerpoolorder: (await workerpoolOrder).order,
      requestorder: signedRequestOrder,
    });
    console.log("deal id:", dealid);
    console.log("Tx hash", txHash);
  };

  return (
    <div className="mt-16 mx-8">
      <h1>This is the Inbox page</h1>
      <button
        className="rounded-md bg-white text-black px-6 py-2"
        onClick={async () => {
          getAppOrder();
          fetchMyRequestOrders();
        }}
      >
        Get my orders
      </button>
      <button
        className="rounded-r-md bg-white text-black px-6 py-2"
        onClick={async () => runDowloadTask()}
      >
        Run task
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

              const isCompleted =
                datasetOrder.deals &&
                datasetOrder.deals[0] &&
                datasetOrder.deals[0].tasks &&
                datasetOrder.deals[0].tasks[0] &&
                datasetOrder.deals[0].tasks[0].status === "COMPLETED";
              return (
                <tr className="text-center border-b border-gray-200" key={i}>
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
                    {isCompleted ? <p>Download</p> : <p>Transfer pending</p>}
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
