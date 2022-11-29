import { IExec } from "iexec";
import * as ace from "../../shared/constants";

const configArgs = { ethProvider: window.ethereum, chainId: 134 };
const configOptions = {
    smsURL: "https://v7.sms.debug-tee-services.bellecour.iex.ec",
};
const iexec = new IExec(configArgs, configOptions);

/**
 * Get the app orders from the orderbook for ACE app
 * @returns the app orders from the orderbook
 */
const getAppOrders = async() => {
    const { count, orders } = await iexec.orderbook.fetchAppOrderbook(
        ace.APP_ADDRESS, {
            workerpool: ace.WORKERPOOL_ADDRESS,
        }
    );
    console.log("total orders:", count);
    console.log("App orders:", orders);
    //console.log("One order:", orders[0]);
    return orders;
};

/**
 * Get the workerpool orders from the orderbook for TEE apps
 * @returns the workerpool orders from the orderbook
 */
const getWorkerpoolOrders = async() => {
    const { orders } = await iexec.orderbook.fetchWorkerpoolOrderbook({
        workerpool: ace.WORKERPOOL_ADDRESS,
        category: 0,
        minTag: ace.TEE_TAG,
        maxTag: ace.TEE_TAG,
    });
    console.log("Workerpool orders", orders);
    return orders;
};

/**
 * Get the dataset orders from the orderbook for the dataset address
 * @param {string} datasetAddress 
 * @param {string | undefined} datasetRequester 
 * @returns the dataset orders from the orderbook for the dataset address
 */
const getDatasetOrders = async(datasetAddress, datasetRequester) => {
    const { orders } = await iexec.orderbook.fetchDatasetOrderbook(
        datasetAddress, {
            app: ace.APP_ADDRESS,
            minTag: ace.TEE_TAG,
            maxTag: ace.TEE_TAG,
            requester: datasetRequester,
        }
    );
    console.log("dataset orders", orders);
    // console.log("One dataset order", orders[0]);
    return orders;
};

export {getAppOrders, getWorkerpoolOrders, getDatasetOrders}