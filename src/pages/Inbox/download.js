import { IExec } from "iexec";
import * as ace from "../../shared/constants";
import JSZip from "jszip";
import {bufferToJson} from "../../utils/bufferToJson";

const configArgs = { ethProvider: window.ethereum, chainId: 134 };
const configOptions = { smsURL: ace.SMS_URL };
const iexec = new IExec(configArgs, configOptions);


/**
 * 
 * @param {string} taskId dataset task id
 * @returns the file JSON
 */
const fromDatasetToFileJSON = async (taskId) => {
  const task = await iexec.task.show(taskId);
  console.log("task show:\n", task);
  const dealId = task.dealid;

  const taskResult = await iexec.task.fetchResults("0x33af944de7330aadf4b49b2f89d0200e3d4f63104f55a8495a714186d9fd70e7"); // fetch task id from table here
  console.log(taskResult);
  const url = await taskResult.url;
  console.log(url);
  const binary = await taskResult.blob();
  console.log("Response binary", binary);
  const zipInstance = new JSZip();
  let resultFileString = await zipInstance.loadAsync(binary).then((zip) => {
    return zip.file("result.json").async("string");
  });

  let resultFile = JSON.parse(resultFileString);
  console.log("resultFile", resultFile);
  return resultFile;
};

/**
 * 
 * @param {string} fileUrl
 * @returns the file from the url in a UInt8Array object
 */
const fetchFromFileToDownloadableFileObject = async (fileUrl) => {
    let responseArray = await fetch(
        fileUrl, {method: 'GET'}
    ).then((response) => {
        //return new Uint8Array(response.arrayBuffer()); //to convert to UintArray8
        return response.arrayBuffer();
    })
    let responseBuffer = Buffer.from(responseArray);
    let responseObject = bufferToJson(responseBuffer)
    return responseBuffer;
}

export { fromDatasetToFileJSON, fetchFromFileToDownloadableFileObject };