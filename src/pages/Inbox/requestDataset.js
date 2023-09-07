import {requestAccess} from "../../dataprotector-extentions/requestAccess.ts";


/**
 * Request the dataset in order to download the contained file
 * @param {string} datasetAddress address of the requested dataset
 * @param {string} datasetRequester wallet address requesting the dataset
 */
const requestDataset = async(datasetAddress, datasetRequester, datasetOwner, sendDate, price) => {
    const {deal, task} = await requestAccess(datasetRequester, datasetAddress, price);
    console.log("Deal details", deal, "\nTask details", task) //if (IS_DEBUG) 
};

export default requestDataset;