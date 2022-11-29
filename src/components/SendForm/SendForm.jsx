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
import ReactTooltip from 'react-tooltip';

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
    const checkbox = document.getElementById("optimistic");
    console.log(checkbox.checked);
    optimistic = !optimistic;
  };

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
                  onDrop={(e) => {
                    e.preventDefault();
                    handleChange(e);
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    handleChange(e);
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
                  onDrop={(e) => {
                    e.preventDefault();
                    handleChange(e);
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    handleChange(e);
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
                  required
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
          <ReactTooltip multiline="true"/>

            <div className="mb-4 optimisticContainer">
              <input type="checkbox" name="optimistic" id="optimistic" onClick={handleChecked} />
              <label htmlFor="optimistic" className="ml-2">
                Optimistic IPFS upload <svg  data-tip="Activate this setting to speedup the upload process.<br/>By default, the system will ensure that the file is available on IPFS before proceeding to the next step." xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inlineText">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
</svg>
              </label>
            </div>

            <div className="mx-4 rounded-lg bg-iexblk">
              <button
                className="btn h-8 w-full font-bold"
                type="submit"
                onClick={async (e) => {
                  e.preventDefault();
                  console.log("optimistic", optimistic);
                  console.log("Step", BEGINNING_PROCESS); //Write the different steps in order to have the workflow
                  setIsLoading(true);
                  setStep(ENCRYPTING_FILE);

                  const encryptedFileJSON = await encryptFile(selectedFiles[0]);
                  const fileName = selectedFiles[0].name;
                  const fileSize = selectedFiles[0].size;
                  console.log(fileName);
                  console.log("Size:", fileSize);
                  setStep(UPLOADING_FILE);
                  const encryptedFile = jsonToBuffer(encryptedFileJSON);
                  console.log("encryptedFile:", encryptedFile);

                  var fileUrl = await uploadData(encryptedFile);
                  console.log("File uploaded at", fileUrl);

                  var ok = false;
                  if (!optimistic) {
                    await delay(DELAY_BEFORE_CHECKING_FILE_UPLOADED);

                    while (!ok) {
                      console.log("Checking file availability at", fileUrl);
                      ok = await checkFileAvailability("", () =>
                        console.log("checking ended...")
                      ); //fileUrl
                      console.log(ok);
                    }
                  }
                  setIsAvailable(ok);

                  setStep(ENCRYPTING_DATASET);
                  await delay(1)
                  const encryptedDataset = await encryptDataset(fileUrl, fileName, message, fileSize);

                  setStep(UPLOADING_DATASET);
                  var datasetUrl = await uploadData(encryptedDataset);
                  await delay(DELAY_BEFORE_CHECKING_FILE_UPLOADED);

                  // if (!optimistic) {
                  //   ok = false;
                  //   while (!ok) {
                  //     console.log("Checking dataset availability");
                  //     ok = await checkFileAvailability(datasetUrl, () =>
                  //       console.log("checking ended...")
                  //     );
                  //     console.log(ok);
                  //   }
                  // }

                  setStep(DEPLOYING_DATASET);
                  await delay(1)
                  const datasetName = generateDatasetName(connectedAccount, addressTo);
                  const checksum = await generateEncryptedFileChecksum(encryptedDataset);
                  const datasetAddress = await deployDataset(datasetName, datasetUrl, checksum);

                  setStep(PUSHING_SECRET);
                  await pushSecret(datasetAddress, datasetEncryptionKey);
                  const isSecretPushed = await iexec.dataset.checkDatasetSecretExists(datasetAddress);
                  console.log("secret is pushed?", isSecretPushed);

                  await pushOrder(datasetAddress, addressTo);

                  setStep(FINISHED);
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
