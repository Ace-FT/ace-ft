import React, {useRef, useState, useContext} from 'react';
import { AceContext } from '../context/context';

const SendForm = () => {
  const { addressTo, setAddressTo, price, setPrice, message, setMessage, selectedFiles, setSelectedFiles, encryption, delay, checkFileAvailability, isAvailable, setIsAvailable } = useContext(AceContext);
  const inputFile = useRef(null);
  const [isAFile, setIsAFile] = useState(false);
  
  const DELAY_BEFORE_CHECKING_FILE_UPLOADED = 4

  const handleChange = (event) => {
    console.log("hello")

    setSelectedFiles([...selectedFiles, event.target.files[0]]);
    setIsAFile(true);
    for (var i = 0; i < selectedFiles.length; i+=1) {
      console.log(selectedFiles[i])
    }
  }

  return (
    <div>
      <form>
        <div className="w-full flex flex-col max-w-xs rounded-3xl shadow-xl bg-white text-black px-4 py-4">
          <div className="uploader">
            { isAFile ? (
              <div>
                {selectedFiles.map(file => {
                  return (
                    <div className="block" key={file.name}>{file.name}</div>
                  )
                })}
                <button
                  className="w-full flex items-center border-b border-gray-500 px-4 py-8"
                  onClick={(e) => {
                    e.preventDefault();
                    inputFile.current.click()
                  }}
                >
                  <svg viewBox="0 0 72 72" className="w-9">
                    <path
                      d="M36.493 72C16.118 72 0 55.883 0 36.493 0 16.118 16.118 0 36.493 0 55.882 0 72 16.118 72 36.493 72 55.882 55.883 72 36.493 72zM34 34h-9c-.553 0-1 .452-1 1.01v1.98A1 1 0 0 0 25 38h9v9c0 .553.452 1 1.01 1h1.98A1 1 0 0 0 38 47v-9h9c.553 0 1-.452 1-1.01v-1.98A1 1 0 0 0 47 34h-9v-9c0-.553-.452-1-1.01-1h-1.98A1 1 0 0 0 34 25v9z"
                      fill="#5268ff"
                      fill-rule="nonzero"
                    ></path>
                  </svg>
                  <h3 className="text-2xl font-thin mx-4">Upload files</h3>
                </button>
                <input type="file" className="hidden" onChange={handleChange} ref={inputFile}/>
              </div>
              
            ) : (
              <div>
                <button
                  className="w-full flex items-center border-b border-gray-500 px-4 py-16"
                  onClick={(e) => {
                    e.preventDefault();
                    inputFile.current.click()
                  }}
                >
                  <svg viewBox="0 0 72 72" className="w-9">
                    <path
                      d="M36.493 72C16.118 72 0 55.883 0 36.493 0 16.118 16.118 0 36.493 0 55.882 0 72 16.118 72 36.493 72 55.882 55.883 72 36.493 72zM34 34h-9c-.553 0-1 .452-1 1.01v1.98A1 1 0 0 0 25 38h9v9c0 .553.452 1 1.01 1h1.98A1 1 0 0 0 38 47v-9h9c.553 0 1-.452 1-1.01v-1.98A1 1 0 0 0 47 34h-9v-9c0-.553-.452-1-1.01-1h-1.98A1 1 0 0 0 34 25v9z"
                      fill="rgb(29 78 216)"
                      fill-rule="nonzero"
                    ></path>
                  </svg>
                  <h3 className="text-2xl font-extralight mx-4">Upload files</h3>
                </button>
                <input type="file" className="hidden" onChange={handleChange} ref={inputFile}/>
              </div>
            )}
          </div>
          <div className="p-4">
            <div className="pb-4">
              <input
                className="w-full border-b border-gray-500 focus:outline-none pb-2"
                type="text"
                autoComplete="off"
                value={addressTo}
                onChange={ e => setAddressTo(e.target.value) }
                placeholder="To"
              />
            </div>
            <div className="pb-4">
              <input
                className="w-full border-b border-gray-500 focus:outline-none pb-2"
                type="text"
                autoComplete="off"
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Message"
              />
            </div>
            <div>
              <input
                className="w-full border-b border-gray-500 focus:outline-none pb-2"
                type="number"
                autoComplete="off"
                value={price}
                min="0"
                step="0.01"
                onChange={e => setPrice(e.target.value)}
                placeholder="Price (RLC)"
              />
            </div>
          </div>
          <div className="formFooter items-center mx-auto p-4">
              <button
                className="rounded-l-full rounded-r-full bg-blue-700 text-white font-bold px-8 py-2"
                type='submit'
                onClick={async (e) => {
                  e.preventDefault();
                  encryption();
                  await delay(DELAY_BEFORE_CHECKING_FILE_UPLOADED)
                  console.log("lets gooo")
                  var ok = false;
                  while (!ok) {
                    console.log("checking")
                    ok = await checkFileAvailability(() => console.log("checking ended..."))
                    console.log(ok)
                    //await check.wait()
                    //setInterval(checkFileAvailability(), 30 * 1000) //every 30 secs
                  }
                  console.log("File available")
                  setIsAvailable(ok);
                }}
              >
                Transfer
              </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SendForm;