import React, { useRef, useState, useContext, useEffect } from "react";
import { AceContext } from "../../context/context";
import { IExec } from "iexec";
import * as ace from "../../shared/constants";
import { delay } from "../../utils/delay";
import { encryptFile, encryptDataset, generateEncryptedFileChecksum, datasetEncryptionKey } from "./encryption.js";
import uploadData from "./upload";
import { deployDataset, pushSecret, pushOrder } from "./deploy.js";
import { generateDatasetName } from "../../utils/datasetNameGenerator.ts";
import { jsonToBuffer } from "../../utils/jsonToBuffer";

const configArgs = { ethProvider: window.ethereum, chainId: 134 };
const configOptions = { smsURL: ace.SMS_URL };
const iexec = new IExec(configArgs, configOptions);

const SendForm = () => {
  const { connectedAccount, connectWallet, bgUrls } = useContext(AceContext);

  const { isLoading, setIsLoading, addressTo, setAddressTo, step, setStep, price, setPrice, message, setMessage, selectedFiles, setSelectedFiles, checkFileAvailability, setIsAvailable } = useContext(AceContext);
  const inputFile = useRef(null);
  const [isAFile, setIsAFile] = useState(false);


  const BEGINNING_PROCESS = 0;
  const ENCRYPTING_FILE = 1;
  const UPLOADING_FILE = 2;
  const ENCRYPTING_DATASET = 3;
  const UPLOADING_DATASET = 4;
  const DEPLOYING_DATASET = 5;
  const PUSHING_SECRET = 6;
  const FINISHED = 7;


  const steps = [
    "BEGINNING PROCESS", // 0
    "ENCRYPTING FILE", // 1
    "UPLOADING FILE", // 2
    "FILE AVAILABLE", //3
    "ENCRYPTING DATASET", // 4
    "UPLOADING DATASET",
    "DATASET AVAILABLE", //6
    "DEPLOYING DATASET", // 7
    "PUSHING SECRET", // 8
    "PUSHING DATASET ORDER", //9
    "END OF PROCESS", // 10
  ];

  var status = BEGINNING_PROCESS;
  function nextStep() {
    return (status = status + 1);
  }


  const DELAY_BEFORE_CHECKING_FILE_UPLOADED = 3;

  const handleChange = (event) => {
    setSelectedFiles([...selectedFiles, event.target.files[0]]);
    setIsAFile(true);
    for (var i = 0; i < selectedFiles.length; i += 1) {
      console.log(selectedFiles[i]);
    }
  };


  var optimistic = false;
  const handleChecked = () => {
    const checkbox = document.getElementById("optimistic")
    console.log(checkbox.checked)
    optimistic = !optimistic;
  }

  return (
    <>
      <form>
        <div className="mr-8 flex w-80 flex-col rounded-2xl bg-iexwhite px-4 py-4 text-iexblk shadow-xl">
          <div className="uploader">
            {isAFile ? (
              <div>
                {selectedFiles.map((file) => {
                  return (
                    <div className="block" key={file.name}>
                      {file.name}
                    </div>
                  );
                })}
                <button
                  className="flex w-full items-center border-b border-gray-500 px-4 py-8"
                  onClick={(e) => {
                    e.preventDefault();
                    inputFile.current.click();
                  }}
                >
                  <svg viewBox="0 0 72 72" className="w-9">
                    <path
                      d="M36.493 72C16.118 72 0 55.883 0 36.493 0 16.118 16.118 0 36.493 0 55.882 0 72 16.118 72 36.493 72 55.882 55.883 72 36.493 72zM34 34h-9c-.553 0-1 .452-1 1.01v1.98A1 1 0 0 0 25 38h9v9c0 .553.452 1 1.01 1h1.98A1 1 0 0 0 38 47v-9h9c.553 0 1-.452 1-1.01v-1.98A1 1 0 0 0 47 34h-9v-9c0-.553-.452-1-1.01-1h-1.98A1 1 0 0 0 34 25v9z"
                      fill="rgb(252 209 90)"
                      fillRule="nonzero"
                    ></path>
                  </svg>
                  <h3 className="mx-4 text-2xl font-light">Upload files</h3>
                </button>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleChange}
                  ref={inputFile}
                />
              </div>
            ) : (
              <div>
                <button
                  className="flex w-full items-center border-b border-gray-500 px-4 py-16"
                  onClick={(e) => {
                    e.preventDefault();
                    inputFile.current.click();
                  }}
                >
                  <svg viewBox="0 0 72 72" className="w-9">
                    <path
                      d="M36.493 72C16.118 72 0 55.883 0 36.493 0 16.118 16.118 0 36.493 0 55.882 0 72 16.118 72 36.493 72 55.882 55.883 72 36.493 72zM34 34h-9c-.553 0-1 .452-1 1.01v1.98A1 1 0 0 0 25 38h9v9c0 .553.452 1 1.01 1h1.98A1 1 0 0 0 38 47v-9h9c.553 0 1-.452 1-1.01v-1.98A1 1 0 0 0 47 34h-9v-9c0-.553-.452-1-1.01-1h-1.98A1 1 0 0 0 34 25v9z"
                      fill="rgb(252 209 90)"
                      fillRule="nonzero"
                    ></path>
                  </svg>
                  <h3 className="mx-4 text-2xl font-extralight">
                    Upload files
                  </h3>
                </button>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleChange}
                  ref={inputFile}
                />
              </div>
            )}
          </div>
          <div className="p-4">
            <div className="pb-4">
              <input
                className="w-full border-b border-gray-500 bg-iexwhite pb-2 focus:outline-none"
                type="text"
                autoComplete="off"
                value={addressTo}
                onChange={(e) => setAddressTo(e.target.value)}
                placeholder="To"
              />
            </div>
            <div className="pb-4">
              <input
                className="w-full border-b border-gray-500 bg-iexwhite pb-2 focus:outline-none"
                type="text"
                autoComplete="off"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message"
              />
            </div>
            <div>
              <input
                className="w-full border-b border-gray-500 bg-iexwhite pb-2 focus:outline-none"
                type="number"
                autoComplete="off"
                value={price}
                min="0"
                step="0.01"
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price (RLC)"
              />
            </div>
          </div>
          <div className="formFooter mx-auto items-center p-4">
            <div className="mb-4">
              <input type="checkbox" name="optimistic" id="optimistic" onClick={handleChecked} />
              <label htmlFor="optimistic" className="ml-2">
                Optimistic upload
              </label>
            </div>

            <div className="bg-iexblk rounded-lg mx-4">
            <button
              className="btn w-full font-bold h-8"
              type="submit"
              onClick={async (e) => {
                e.preventDefault();
                console.log("optimistic", optimistic)
                console.log("Step", BEGINNING_PROCESS); //Write the different steps in order to have the workflow
                status = nextStep(status);
                setIsLoading(true);
                setStep(ENCRYPTING_FILE);
                console.log("Step", status, ": ", steps[status]); //Write the different steps in order to have the workflow

                const encryptedFileJSON = await encryptFile(selectedFiles[0]);
                const fileName = selectedFiles[0].name;
                const fileSize = selectedFiles[0].size;
                console.log(fileName);
                console.log("Size:", fileSize);
                status = nextStep(status);
                setStep(UPLOADING_FILE);
                console.log("Step", status, ": ", steps[status]); // 2
                console.log("encryptedFile JSON:", encryptedFileJSON);

                const encryptedFile = jsonToBuffer(encryptedFileJSON);
                console.log("encryptedFile:", encryptedFile);

                var fileUrl = await uploadData(encryptedFile);
                console.log("File uploaded at", fileUrl);
                
                var ok = false;
                if(!optimistic) {
                  await delay(DELAY_BEFORE_CHECKING_FILE_UPLOADED);
                  
                  while (!ok) {
                    console.log("Checking file availability at", fileUrl);
                    ok = await checkFileAvailability("", () =>
                      console.log("checking ended...")
                    ); //fileUrl
                    console.log(ok);
                  }
                }
                
                nextStep(status);
                console.log(`Step ${status}: ${steps[status]}`); // 3
                setIsAvailable(ok);

                nextStep(status);
                setStep(ENCRYPTING_DATASET);
                console.log(`Step ${status}: ${steps[status]}`);
                const encryptedDataset = await encryptDataset(
                  fileUrl,
                  message,
                  fileSize
                );

                nextStep(status);
                setStep(UPLOADING_DATASET);
                console.log(`Step ${status}: ${steps[status]}`); // 5
                var datasetUrl = await uploadData(encryptedDataset);
                await delay(DELAY_BEFORE_CHECKING_FILE_UPLOADED);

                ok = false;
                while (!ok) {
                  console.log("Checking dataset availability");
                  ok = await checkFileAvailability(datasetUrl, () =>
                    console.log("checking ended...")
                  );
                  console.log(ok);
                }

                nextStep(status);
                console.log(`Step ${status}: ${steps[status]}`); // 6

                nextStep(status);
                setStep(DEPLOYING_DATASET);
                console.log(`Step ${status}: ${steps[status]}`); // 7
                const datasetName = generateDatasetName(
                  connectedAccount,
                  addressTo
                );
                console.log("Dataset Url : ", datasetUrl);
                const checksum = await generateEncryptedFileChecksum(
                  encryptedDataset
                );
                const datasetAddress = await deployDataset(
                  datasetName,
                  datasetUrl,
                  checksum
                );

                nextStep(status);
                setStep(PUSHING_SECRET);
                console.log(`Step ${status}: ${steps[status]}`); //8
                console.log("Before secret : dataset encryption key", datasetEncryptionKey);
                await pushSecret(datasetAddress, datasetEncryptionKey);
                nextStep(status);
                const isSecretPushed = await iexec.dataset.checkDatasetSecretExists(datasetAddress);
                console.log("secret is pushed?", isSecretPushed);

                nextStep(status);
                //setState("... making order");
                console.log(`Step ${status}: ${steps[status]}`); //9
                await pushOrder(datasetAddress, addressTo);

                nextStep(status);
                setStep(FINISHED);
                console.log(`Step ${status}: ${steps[status]}`);
              }}
            >
              Transfer
            </button>
            </div>

          </div>
        </div>
      </form>
    </>
  );
};

export default SendForm;
