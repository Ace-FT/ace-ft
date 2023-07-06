import { IExecDataProtector } from "@iexec/dataprotector";
import * as ace from "../../shared/constants";
import { getIexec } from "../../shared/getIexec";
import { getAppOrders, getWorkerpoolOrders, getDatasetOrders } from "./getOrders";
import {setIexecProvider} from "../../shared/web3AuthLogin";
import NodeRSA from "node-rsa";
import {list} from "postcss";
import formatDate from "../../utils/formatDate";
import {requestAccess} from "../../dataprotector-extentions/requestAccess.ts";
const IS_DEBUG = process.env.REACT_APP_IS_DEBUG === 'true';


/**
 * Request the dataset in order to download the contained file
 * @param {string} datasetAddress address of the requested dataset
 * @param {string} datasetRequester wallet address requesting the dataset
 */
const requestDataset = async(datasetAddress, datasetRequester, datasetOwner, sendDate) => {

    // let iexec = getIexec() ;
    // if (IS_DEBUG) console.log("START requestDataset");

    // const ipfsToken = await iexec.storage.defaultStorageLogin();
    // if (IS_DEBUG) console.log("datasetAddress, datasetRequester, ipfsToken", datasetAddress, datasetRequester, ipfsToken);
    // const { isPushed } = await iexec.storage.pushStorageToken(ipfsToken, { forceUpdate: true });
    // if (IS_DEBUG) console.log('Default storage initialized:', isPushed);

    // const appOrders = await getAppOrders(); // order on my app
    // const workerpoolOrders = await getWorkerpoolOrders();
    // const datasetOrders = await getDatasetOrders(datasetAddress,datasetRequester);

    // var appOrderToMatch = null;
    // if (appOrders && appOrders[0]) {
    //     appOrderToMatch = appOrders[0];
    // }
    // var workerpoolOrderToMatch = null;
    // if (workerpoolOrders && workerpoolOrders[0]) {
    //     workerpoolOrderToMatch = workerpoolOrders[0];
    // }
    // var datasetOrderToMatch = null;
    // if (datasetOrders && datasetOrders[0]) {
    //     datasetOrderToMatch = datasetOrders[0];
    // }

    // let secretExists = await iexec.secrets.checkRequesterSecretExists(datasetRequester, "my-address");
    // if (!secretExists) await iexec.secrets.pushRequesterSecret("my-address", datasetRequester);

    
    // let secrets = {
    //     1: "my-address"
    // }

    
    // const requestOrderTemplate = await iexec.order.createRequestorder({
    //     app: ace.APP_ADDRESS,
    //     category: 0,
    //     dataset: datasetAddress,
    //     workerpool: ace.WORKERPOOL_ADDRESS,
    //     tag: "tee",
    //     beneficiary: datasetRequester,
    //     params: {
    //         iexec_secrets: secrets,
    //         // iexec_result_encryption: true
    //     }
    // });
    // if (IS_DEBUG) console.log("Request order", requestOrderTemplate);

    // const signedRequestOrder = await iexec.order.signRequestorder(
    //     requestOrderTemplate
    // );
    // if (IS_DEBUG) console.log("signedRequestOrder:", signedRequestOrder);

    // if (IS_DEBUG) console.log("---------------------------------------------");
    // if (IS_DEBUG) console.log("Matching orders...");
    // if (IS_DEBUG) console.log("datasetorder\n", datasetOrderToMatch)
    // if (IS_DEBUG) console.log("workerpoolorder\n", workerpoolOrderToMatch);
    // if (IS_DEBUG) console.log("apporder\n", appOrderToMatch)

    // const { dealid, txHash } = await iexec.order.matchOrders({
    //     apporder: appOrderToMatch.order,
    //     datasetorder: datasetOrderToMatch.order,
    //     workerpoolorder: workerpoolOrderToMatch.order,
    //     requestorder: signedRequestOrder,
    // });
    // if (IS_DEBUG) console.log("deal id:", dealid);
    // if (IS_DEBUG) console.log("Tx hash", txHash);
    
    // const deal = await iexec.deal.show(dealid)
    // if (IS_DEBUG) console.log("Deal details", deal)
    // sessionStorage.setItem(`${deal.tasks[0]}`, true)
    // console.log("Get storage session", deal.tasks[0], sessionStorage.getItem(deal.tasks[0]))


    const {deal, task} = await requestAccess(datasetRequester, datasetAddress);
    console.log("Deal details", deal, "\nTask details", task) //if (IS_DEBUG) 


    // const web3provider = await setIexecProvider();
    // console.log(web3provider)
    // const dataProtector = new IExecDataProtector(web3provider);
    // let listAllProtctedDataFromOwner = await dataProtector.fetchProtectedData({
    //     // requiredSchema: {
    //     //     url:
    //     //     fn,
    //     //     message,
    //     //     size
    //     // },
    //     owner: datasetOwner
    // })
    // console.log("listProtectedData", listAllProtctedDataFromOwner)

    // let oneProtected = listAllProtctedDataFromOwner.map(item => {
    //     let ts = item.creationTimestamp * 1000;
    //     console.log(ts)
    //     let date = new Date(ts);
    //     console.log(date)
    //     //et date = formatDate(item.cretionTimestamp)
    //     console.log(sendDate)
    //     if (item.creationTimestamp === sendDate) {
    //         return item;
    //     }
    // })


    // let oneProtected = listAllProtctedDataFromOwner[0];
    // console.log("oneProtected", oneProtected);
};

export default requestDataset;