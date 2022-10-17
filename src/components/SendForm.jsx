import React from 'react';

const SendForm = () => {
    return (
      <div>
        <form>
          <div class="w-full flex flex-col max-w-sm rounded-3xl shadow-xl bg-white text-black my-32 ml-32 p-2">
            <div className="uploader flex items-center border-b border-gray-500 p-4">
              <svg viewBox="0 0 72 72" className="w-9">
                <path
                  d="M36.493 72C16.118 72 0 55.883 0 36.493 0 16.118 16.118 0 36.493 0 55.882 0 72 16.118 72 36.493 72 55.882 55.883 72 36.493 72zM34 34h-9c-.553 0-1 .452-1 1.01v1.98A1 1 0 0 0 25 38h9v9c0 .553.452 1 1.01 1h1.98A1 1 0 0 0 38 47v-9h9c.553 0 1-.452 1-1.01v-1.98A1 1 0 0 0 47 34h-9v-9c0-.553-.452-1-1.01-1h-1.98A1 1 0 0 0 34 25v9z"
                  fill="#5268ff"
                  fill-rule="nonzero"
                ></path>
              </svg>
              <h3 className="text-2xl mx-6">Upload files</h3>
            </div>
            <div className="p-4">
              <div className="pb-4">
                <input
                  className="w-full border-b border-gray-500 focus:outline-none pb-2"
                  type="text"
                  autoComplete="off"
                  value=""
                  onChange=""
                  placeholder="To"
                />
              </div>
              <div className="pb-4">
                <input
                  className="w-full border-b border-gray-500 focus:outline-none pb-2"
                  type="text"
                  autoComplete="off"
                  value=""
                  onChange=""
                  placeholder="Message"
                />
              </div>
              <div>
                <input
                  className="w-full border-b border-gray-500 focus:outline-none pb-2"
                  type="number"
                  autoComplete="off"
                  value=""
                  step="0.001"
                  onChange=""
                  placeholder="Price"
                />
              </div>
            </div>
            <div className="formFooter items-center mx-auto p-4">
                <button className="rounded-l-full rounded-r-full bg-blue-700 text-white font-bold px-8 py-2" type='submit'>Transfer</button>
            </div>
          </div>
        </form>
      </div>
    );
}

export default SendForm;