import { IExec } from "iexec";
import * as ace from "../../shared/constants";
import JSZip from "jszip";
import { bufferToJson } from "../../utils/bufferToJson";
const IS_DEBUG = process.env.REACT_APP_IS_DEBUG == 'true';

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
  if (IS_DEBUG) console.log("task show:\n", task);
  const dealId = task.dealid;
  console.log(task.taskid)

  const taskResult = await iexec.task.fetchResults(task.taskid); // fetch task id from table here
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
  let responseArray = await fetch(fileUrl).then(
    (response) => {
      //return new Uint8Array(response.arrayBuffer()); //to convert to UintArray8
      return response.arrayBuffer();
    }
  );
  let responseBuffer = Buffer.from(responseArray);
  let responseObject = bufferToJson(responseBuffer);
  return responseObject;
};


const saveFile = (blobdata, fileName) => {
  var a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";

  console.log("blobdata", blobdata);

  var url = window.URL.createObjectURL(blobdata);
  a.href = url;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url);
};

export {
  fromDatasetToFileJSON,
  fetchFromFileToDownloadableFileObject,
  saveFile,
};
