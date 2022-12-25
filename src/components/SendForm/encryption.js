import { Buffer } from "buffer";
import { datasetStruct } from "../../utils/datasetStruct.ts";
import { jsonToBuffer } from "../../utils/jsonToBuffer";
import * as ace from "../../shared/constants";
import { getIexec } from "../../shared/getIexec";

import crypto from 'crypto-browserify';
import {fileEncKey, fromFileToEncryptedFile} from "../../utils/fileAESEncryption";
const IS_DEBUG = process.env.REACT_APP_IS_DEBUG == 'true';

const { ethereum } = window;

const ALGORITHM = "aes-256-cbc";

var datasetEncryptionKey = "";


/**
 * Encrypt a selected file using iExec encryption module
 * @param {File} selectedFile The file to encrypt
 * @returns The encrypted file buffer
 */
const encryptFile = async (selectedFile) => {  
    try {
      if (IS_DEBUG) console.log("Encryption key: " + fileEncKey);
      if (IS_DEBUG) console.log(selectedFile)
      const fileBytes = await new Promise(async (resolve, reject) => {
          const fileReader = new FileReader();
          await fileReader.readAsArrayBuffer(selectedFile);
          fileReader.onload = (e) => { resolve(e.target.result) }
          fileReader.onerror = () => reject(Error(`Error`))
          fileReader.onabort = () => reject(Error(`Error : aborded`))
      });

      let fileArray = new Uint8Array(fileBytes)
      if (IS_DEBUG) console.log("File array\n", fileArray)

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
 * @param {string} fileName the name of the file
 * @param {string} message the message for benefeciary, sent with the encrypted file
 * @param {number} size the message for benefeciary, sent with the encrypted file
 * @returns The encrypted dataset buffer
 */
const encryptDataset = async (fileUrl, fileName, message, size) => {
    let iexec = getIexec() ;
    datasetEncryptionKey = iexec.dataset.generateEncryptionKey();
    if (IS_DEBUG) console.log("FILE encryption key tostring:", fileEncKey.toString());
    // console.log("FILE encryption buffer:", Buffer.from(fileEncKey));

    var datasetContent = datasetStruct(fileEncKey, fileUrl, fileName, message, size);
    const datasetBuffer = jsonToBuffer(datasetContent);

    const encryptedDataset = await iexec.dataset.encrypt(datasetBuffer, datasetEncryptionKey);
    return encryptedDataset;
}

/**
 * generate the encrypted dataset file checksum required for dataset deployment
 * @param {Buffer} encrypted the encrypted dataset
 * @returns the sha256sum of the encrypted dataset file
 */
const generateEncryptedFileChecksum = async (encrypted) => {
  let iexec = getIexec() ;
  const checksum = await iexec.dataset.computeEncryptedFileChecksum(encrypted)
  if (IS_DEBUG) console.log(checksum)
  return checksum;
}

export { encryptFile, encryptDataset, generateEncryptedFileChecksum, datasetEncryptionKey };