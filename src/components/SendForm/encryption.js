import { IExec } from "iexec";
import { Buffer } from "buffer";
import { datasetStruct } from "../../utils/datasetStruct.ts";
import { jsonToBuffer } from "../../utils/jsonToBuffer";
import * as ace from "../../shared/constants";
import crypto from 'crypto-browserify';
import {fileEncKey, fromFileToEncryptedFile} from "../../utils/fileAESEncryption";

const { ethereum } = window;
const configArgs = { ethProvider: window.ethereum, chainId : 134};
const configOptions = { smsURL: ace.SMS_URL };
const iexec = new IExec(configArgs, configOptions);
const ALGORITHM = "aes-256-cbc";


var fileEncryptionKey = null;
var fileEncrInitialisationVector = null;
var datasetEncryptionKey = "";


/**
 * Encrypt a selected file using iExec encryption module
 * @param {File} selectedFile The file to encrypt
 * @returns The encrypted file buffer
 */
const encryptFile = async (selectedFile) => {  
    try {
      // ENCRYPTION
      //console.log("auth", auth);
      //console.log(process.env)
      //console.log("INFURA_ID: " + process.env.REACT_APP_INFURA_ID);
      //console.log("INFURA_SECRET_KEY: " + process.env.REACT_APP_INFURA_SECRET_KEY);

      
      fileEncryptionKey = iexec.dataset.generateEncryptionKey();
      console.log("Encryption key: " + fileEncryptionKey);
      console.log(selectedFile)
      const fileBytes = await new Promise(async (resolve, reject) => {
          const fileReader = new FileReader();
          await fileReader.readAsArrayBuffer(selectedFile);
          fileReader.onload = (e) => { resolve(e.target.result) }
          fileReader.onerror = () => reject(Error(`Error`))
          fileReader.onabort = () => reject(Error(`Error : aborded`))
      });

      let fileArray = new Uint8Array(fileBytes)
      console.log("File array\n", fileArray)

      let output = fromFileToEncryptedFile(fileArray)
      return output;

      // const encryptedFile = await iexec.dataset.encrypt(fileBytes, fileEncryptionKey);
      // console.log("encrypted file", encryptedFile)
      // return encryptedFile;
    } catch (err) {
      console.log(err);
    }
};

/**
 * Encrypt the dataset containing the file encryption key, the file IPFS url and the message
 * @param {string} fileUrl the url where the encrypted file is uploaded on IPFS
 * @param {string} message the message for benefeciary, sent with the encrypted file
 * @param {number} size the message for benefeciary, sent with the encrypted file
 * @returns The encrypted dataset buffer
 */
const encryptDataset = async (fileUrl, message, size) => {
    datasetEncryptionKey = iexec.dataset.generateEncryptionKey();
    console.log("Dataset encryption key: " + datasetEncryptionKey);
    var datasetContent = datasetStruct(fileEncKey, fileUrl, message, size);
    console.log("Dataset content :", datasetContent)
    const datasetBuffer = jsonToBuffer(datasetContent);
    console.log(datasetBuffer)

    const encryptedDataset = await iexec.dataset.encrypt(datasetBuffer, datasetEncryptionKey);
    console.log("encrypted dataset", encryptedDataset)
    //return datasetBuffer;
    //return datasetBuffer;
    return encryptedDataset;
}

/**
 * generate the encrypted dataset file checksum required for dataset deployment
 * @param {Buffer} encrypted the encrypted dataset
 * @returns the sha256sum of the encrypted dataset file
 */
const generateEncryptedFileChecksum = async (encrypted) => {
  const checksum = await iexec.dataset.computeEncryptedFileChecksum(encrypted)
  console.log(checksum)
  return checksum;
}

export { encryptFile, encryptDataset, generateEncryptedFileChecksum, datasetEncryptionKey };