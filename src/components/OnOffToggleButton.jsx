import React, { useContext } from "react";
import { AceContext } from "../context/context";
import "tw-elements";

const OnOffToggleButton = () => {
  const { darkMode, setDarkMode: setDarkMode } = useContext(AceContext);

  const handleOnClick = () => {
    setDarkMode((darkMode) => !darkMode);
  };

  return (
    <>
      <div className="my-12 flex w-full items-center justify-center">
        <label htmlFor="darkMode" className="flex cursor-pointer items-center text-iexwhite">
          <div className="relative mr-4">
            {darkMode ? (
              <input
                type="checkbox"
                id="darkMode"
                className="sr-only"
                checked={false}
                onClick={() => handleOnClick()}
              />
            ) : (
              <input
                type="checkbox"
                id="darkMode"
                className="sr-only"
                checked
                onClick={() => handleOnClick()}
              />
            )}
            <div className="toggleEl block h-7 w-12 rounded-full bg-gray-600"></div>
            <div className="dot absolute left-1 top-1 h-5 w-5 rounded-full bg-iexwhite transition"></div>
          </div>
          Dark mode
        </label>
      </div>
    </>
  );
};

export default OnOffToggleButton;
