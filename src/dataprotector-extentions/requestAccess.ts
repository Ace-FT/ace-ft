import * as ace from "../shared/constants";
import { getIexec } from "../shared/getIexec";
import { MAX_DESIRED_WORKERPOOL_ORDER_PRICE } from "./config.ts";

export const requestAccess = async (accessRequester: string,protectedDataAddress: string) => {
  const iexec = getIexec();

  try {
    const isIpfsStorageInitialized = await iexec.storage.checkStorageTokenExists(accessRequester);
    if (!isIpfsStorageInitialized) {
      const ipfsToken = await iexec.storage.defaultStorageLogin();
      const { isPushed } = await iexec.storage.pushStorageToken(ipfsToken, {
        forceUpdate: true,
      });

      console.log("Default storage initialized:", isPushed);
    }

    // Fetch dataset order
    const datasetOrderbook = await iexec.orderbook.fetchDatasetOrderbook(
      protectedDataAddress,
      {
        app: ace.APP_ADDRESS,
        requester: accessRequester,
        minTag: ["tee", "scone"],
        maxTag: ["tee", "scone"],
      }
    );
    const datasetorder = datasetOrderbook?.orders[0]?.order;
    
    if (!datasetorder) {
      throw new Error("Dataset order not found");
    }

    // Fetch app order
    const appOrderbook = await iexec.orderbook.fetchAppOrderbook(
      ace.APP_ADDRESS,
      {
        minTag: ["tee", "scone"],
        maxTag: ["tee", "scone"],
      }
    );
    const appOrder = appOrderbook?.orders[0]?.order;
    if (!appOrder) {
      throw new Error("App order not found");
    }

    // Fetch workerpool order
    const workerpoolOrderbook = await iexec.orderbook.fetchWorkerpoolOrderbook({
      app: ace.APP_ADDRESS,
      dataset: protectedDataAddress,
      minTag: ["tee", "scone"],
      maxTag: ["tee", "scone"],
    });

    const workerpoolorder = workerpoolOrderbook?.orders[0]?.order;
    if (!workerpoolorder) {
      throw new Error("Workerpool order not found");
    }
    const desiredPriceWorkerpoolOrderbook = workerpoolOrderbook.orders.filter(
      (order) =>
        order.order.workerpoolprice <= MAX_DESIRED_WORKERPOOL_ORDER_PRICE
    );
    const randomIndex = Math.floor(
      Math.random() * desiredPriceWorkerpoolOrderbook.length
    );
    const desiredPriceWorkerpoolOrder = desiredPriceWorkerpoolOrderbook[randomIndex]?.order;
    if (!desiredPriceWorkerpoolOrder) {
      throw new Error("No Workerpool order found for the desired price");
    }

    // Push requester secrets
    let secretExists = await iexec.secrets.checkRequesterSecretExists(
      accessRequester,
      "my-address"
    );

    if (!secretExists)
      await iexec.secrets.pushRequesterSecret("my-address", accessRequester);
    
    let secrets = {
      1: "my-address",
    };

    // Create and sign request order
    const requestorderToSign = await iexec.order.createRequestorder({
      app: ace.APP_ADDRESS,
      category: desiredPriceWorkerpoolOrder.category,
      dataset: protectedDataAddress,
      appmaxprice: appOrder.appprice,
      workerpoolmaxprice: desiredPriceWorkerpoolOrder.workerpoolprice,
      tag: ["tee", "scone"],
      params: {
        iexec_secrets: secrets,
      },
    });

    const requestorder = await iexec.order.signRequestorder(requestorderToSign);

    const { dealid } = await iexec.order.matchOrders({
      apporder: appOrder,
      datasetorder: datasetorder,
      workerpoolorder: desiredPriceWorkerpoolOrder,
      requestorder: requestorder,
    });
    const deal = await iexec.deal.show(dealid);
    
    console.log("Deal details", deal);
    const taskId = await deal.tasks[0];

    return { deal, taskId };
  } catch (err) {
    throw new Error(`${err.message}`);
  }
};
