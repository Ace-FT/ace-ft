import { IExec } from "iexec";
import * as ace from "../../shared/constants";
import { getAppOrders, getWorkerpoolOrders, getDatasetOrders } from "./getOrders";

const configArgs = { ethProvider: window.ethereum, chainId: 134 };
const configOptions = {
  smsURL: "https://v7.sms.debug-tee-services.bellecour.iex.ec",
};
const iexec = new IExec(configArgs, configOptions);


const requestDataset = async (datasetAddress, datasetRequester) => {
  const ipfsToken = await iexec.storage.defaultStorageLogin();
  const { isPushed } = await iexec.storage.pushStorageToken(ipfsToken, {forceUpdate: true});
  console.log('Default storage initialized:', isPushed);

  const appOrders = await getAppOrders(); // order on my app
  const workerpoolOrders = await getWorkerpoolOrders();
  const datasetOrders = await getDatasetOrders(
    datasetAddress,
    datasetRequester
  );

  var appOrderToMatch = null;
  if (appOrders && appOrders[0]) {
    appOrderToMatch = appOrders[0];
  }

  var workerpoolOrderToMatch = null;
  if (workerpoolOrders && workerpoolOrders[0]) {
    workerpoolOrderToMatch = workerpoolOrders[0];
  }

  var datasetOrderToMatch = null;
  if (datasetOrders && datasetOrders[0]) {
    datasetOrderToMatch = datasetOrders[0];
  }

  const requestOrderTemplate = await iexec.order.createRequestorder({
    app: ace.APP_ADDRESS,
    category: 0,
    dataset: datasetAddress,
    workerpool: ace.WORKERPOOL_ADDRESS,
    //params: { iexec_developer_logger: true },
  });
  console.log("Request order", requestOrderTemplate);

  const signedRequestOrder = await iexec.order.signRequestorder(
    requestOrderTemplate
  );
  console.log("Signed:", signedRequestOrder);

  console.log("---------------------------------------------");
  console.log("Matching orders...");
  console.log("datasetorder\n", datasetOrderToMatch)
  console.log("workerpoolorder\n", workerpoolOrderToMatch);
  console.log("apporder\n", appOrderToMatch)

  const { dealid, txHash } = await iexec.order.matchOrders({
    apporder: appOrderToMatch.order,
    datasetorder: datasetOrderToMatch.order,
    workerpoolorder: workerpoolOrderToMatch.order,
    requestorder: signedRequestOrder,
  });
  console.log("deal id:", dealid);
  console.log("Tx hash", txHash);
  const deal = await iexec.deal.show(dealid)
  console.log("deat\n", deal)
  const task = deal.tasks;
  console.log(task)
  console.log(task[0])
  return task[0];
};

export default requestDataset;
