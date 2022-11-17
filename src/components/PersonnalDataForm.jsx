import React, { useContext } from "react";
import {Link} from "react-router-dom";

const PersonnalDataForm = () => {
  return (
    <>
      <form
        action="post"
        className="flex flex-col max-w-1/2 justify-center mx-auto"
      >
        <div className="flex w-96 items-center px-4 py-4">
          <label htmlFor="profpic" className="w-32 mr-2">
            Profile picture
          </label>
          <input
            type="text"
            name="profpic"
            id="profpic"
            className="w-full rounded-md border border-gray-500 focus:outline-none ml-2 p-2"
          />
        </div>
        <div className="flex w-96 items-center px-4 py-4">
          <p className="w-32 mr-2">Telegram</p>
          <a href="https://t.me/ace_ft_bot">
            <button className="w-full rounded-md bg-blue-500 text-white focus:outline-none ml-2 p-2">
              Connect telegram
            </button>
          </a>
        </div>
      </form>
    </>
  );
};

export default PersonnalDataForm;
