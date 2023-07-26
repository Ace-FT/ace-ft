import JSZip from "jszip";
import { bufferToJson } from "../../utils/bufferToJson";
import { getIexec } from "../../shared/getIexec";
import {delay} from "../../utils/delay";

const IS_DEBUG = process.env.REACT_APP_IS_DEBUG === 'true';


/**
 *
 * @param {string} taskId dataset task id
 * @returns the file JSON
 */
const fromDatasetToFileJSON = async (taskId) => {
  let iexec  = getIexec() ;
  await delay(5)
  const task = await iexec.task.show(taskId);
  console.log("task show:\n", task);
  const dealId = task.dealid;
  await delay(2)
  const taskResult = await iexec.task.fetchResults(task.taskid); // fetch task id from table here
  if (IS_DEBUG) console.log(taskResult);
  const url = await taskResult.url;
  if (IS_DEBUG) console.log(url);
  const binary = await taskResult.blob();
  if (IS_DEBUG) console.log("Response binary", binary);
  const zipInstance = new JSZip();
  let resultFileString = await zipInstance.loadAsync(binary).then((zip) => {
    return zip.file("result.json").async("string");
  });

  let resultFile = JSON.parse(resultFileString);
  if (IS_DEBUG) console.log("resultFile", resultFile);
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
