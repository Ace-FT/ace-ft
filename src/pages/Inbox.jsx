import React from "react";
import { AceContext } from "../context/context";
import { IExec } from "iexec";
import * as ace from "../shared/constants";

const Inbox = () => {
  const { ethereum } = window;
  const iexec = new IExec({ ethProvider: window.ethereum });

  const getAppOrder = async () => {
    const { orders } = await iexec.orderbook.fetchAppOrderbook(ace.APP_ADDRESS);
    console.log("App orders:", orders);
    console.log("One order:", orders[0]);
    return orders[0];
  };

  const getWorkerpoolOrder = async () => {
    const { orders } = await iexec.orderbook.fetchWorkerpoolOrderbook({category: 0});
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
    const isPushed = await iexec.storage.pushStorageToken("ipfs", {forceUpdate: true});
    console.log(isPushed);

    const appOrder = getAppOrder(); // order on my app
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
    <div>
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
      <table className="w-full border-collapse max-w-full rounded-2xl shadow-xl bg-white text-black table-auto">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="border-r border-gray-200 py-3">Received date</th>
              <th className="border-r border-gray-200 py-3">From</th>
              <th className="border-r border-gray-200 py-3">Name</th>
              <th className="border-r border-gray-200 py-3">Message</th>
              <th className="border-r border-gray-200 py-3">Price (in RLC)</th>
              <th className="px-3">Downloaded</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center border-b border-gray-200">
                <td className="border-r border-gray-200 p-3">2022-10-24 16:31</td>
                <td className="border-r border-gray-200 p-3">0xad55E45c30A902FE99cdBd776014aA53f692e475</td>
                <td className="border-r border-gray-200 p-3">insert-a-file-name</td>
                <td className="border-r border-gray-200 p-3">Hello</td>
                <td className="border-r border-gray-200 p-3">3</td>
                <td className="my-8"><button>Download file</button></td>
            </tr>                    

            <tr className="text-center">
                <td className="border-r border-gray-200 p-3">2022-10-24 19:39</td>
                <td className="border-r border-gray-200 p-3">0xad55E45c30A902FE99cdBd776014aA53f692e475</td>
                <td className="border-r border-gray-200 p-3">insert-file-name-here</td>
                <td className="border-r border-gray-200 p-3">Test 2</td>
                <td className="border-r border-gray-200 p-3">6</td>
                <td className="my-8"><button>Download file</button></td>
            </tr>
          </tbody>
      </table>
    </div>
  );
};

export default Inbox;
