import * as ace from "../../shared/constants";
import { getIexec } from "../../shared/getIexec";

const IS_DEBUG = process.env.REACT_APP_IS_DEBUG == 'true';


/**
 * Get the app orders from the orderbook for ACE app
 * @returns the app orders from the orderbook
 */
const getAppOrders = async() => {
    let iexec = getIexec();
    const { count, orders } = await iexec.orderbook.fetchAppOrderbook(
        ace.APP_ADDRESS, {
            workerpool: ace.WORKERPOOL_ADDRESS,
        }
    );
    if(IS_DEBUG) console.log("total orders:", count);
    if(IS_DEBUG) console.log("App orders:", orders);
    //console.log("One order:", orders[0]);
    return orders;
};

/**
 * Get the workerpool orders from the orderbook for TEE apps
 * @returns the workerpool orders from the orderbook
 */
const getWorkerpoolOrders = async() => {
    let iexec = getIexec() ;
    const { orders } = await iexec.orderbook.fetchWorkerpoolOrderbook({
        workerpool: ace.WORKERPOOL_ADDRESS,
        category: 0,
        minTag: ace.TEE_TAG,
        maxTag: ace.TEE_TAG,
    });
    if(IS_DEBUG) console.log("Workerpool orders", orders);
    return orders;
};

/**
 * Get the dataset orders from the orderbook for the dataset address
 * @param {string} datasetAddress 
 * @param {string | undefined} datasetRequester 
 * @returns the dataset orders from the orderbook for the dataset address
 */
const getDatasetOrders = async(datasetAddress, datasetRequester) => {
    let iexec = getIexec();

    const { orders } = await iexec.orderbook.fetchDatasetOrderbook(
        datasetAddress, {
            app: ace.APP_ADDRESS,
            minTag: ace.TEE_TAG,
            maxTag: ace.TEE_TAG,
            requester: datasetRequester,
        }
    );
    if(IS_DEBUG) console.log("dataset orders", orders);
    // console.log("One dataset order", orders[0]);
    return orders;
};

export {getAppOrders, getWorkerpoolOrders, getDatasetOrders}