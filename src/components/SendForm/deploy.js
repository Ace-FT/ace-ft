import { IExec } from "iexec";
import { Buffer } from "buffer";
import { delay } from "../../utils/delay";
import { datasetStruct } from "../../utils/datasetStruct.ts";
import * as ace from "../../shared/constants";

const configArgs = { ethProvider: window.ethereum,  chainId : 134};
const configOptions = { smsURL: 'https://v7.sms.debug-tee-services.bellecour.iex.ec' };
const iexec = new IExec(configArgs, configOptions);

/**
 * Deploy a dataset contract on the blockchain
 * @param {string} name the dataset name
 * @param {string} multiaddr the dataset deployment address
 * @param {string} checksum the computed dataset file checksum
 * @returns the dataset address
 */
const deployDataset = async (name, multiaddr, checksum) => {
  try {
    const owner = await iexec.wallet.getAddress();
    console.log("Owner", owner);
    //console.log(imgUrl);
    const { address, txHash } = await iexec.dataset.deployDataset({
      owner,
      name,
      multiaddr,
      checksum,
    });
    console.log("Dataset deployed at", address);
    console.log("Transaction hash", txHash);

    // VERIFICATION DATASET DEPLOYMENT
    await delay(2);
    console.log("Deployed dataset\n", await iexec.dataset.showDataset(address));
    return address;
    // ...............................
  } catch (err) {
    console.error(err);
  }
};

/**
 * Push the dataset's encryption key to SMS
 * @param {string} datasetAddress encrypted dataset address
 * @param {string} datasetEncryptionKey
 */
const pushSecret = async (datasetAddress, datasetEncryptionKey) => {
  try {
    const pushed = await iexec.dataset.pushDatasetSecret(datasetAddress, datasetEncryptionKey);
    console.log("Encryption key pushed ", datasetEncryptionKey);
    console.log("Secret pushed ", pushed);
  } catch (err) {
    console.log(err);
  }
};

/**
 * Push a dataset order on the iExec marketplace making it available for a requester
 * @param {string} datasetAddress the dataset address
 * @param {string} requesterrestrict the requester address the dataset order is restricted for
 */
const pushOrder = async(datasetAddress, requesterrestrict) => {
    try {
      const orderTemplate = await iexec.order.createDatasetorder({ dataset: datasetAddress, volume: 100, apprestrict: ace.APP_ADDRESS, requesterrestrict: requesterrestrict})
      console.log("Unsigned order",orderTemplate)
      const signedOrder = await iexec.order.signDatasetorder(orderTemplate)
      console.log("Signed order", signedOrder)
      const pushedOrder = await iexec.order.publishDatasetorder(signedOrder)
      console.log(pushedOrder);
    } catch (err) {
      console.log(err)
    }
  }

export { deployDataset, pushSecret, pushOrder };
