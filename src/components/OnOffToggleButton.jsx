import React, { useContext } from "react";
import { AceContext } from "../context/context";
import "tw-elements";

const OnOffToggleButton = () => {
  const { creativeMode, setCreativeMode } = useContext(AceContext);

  const handleOnClick = () => {
    setCreativeMode((creativeMode) => !creativeMode);
  };

  return (
    <>
      <div className="my-12 flex w-full items-center justify-center">
        <label htmlFor="creativeMode" className="flex cursor-pointer items-center text-iexwhite">
          <div className="relative mr-4">
            {creativeMode ? (
              <input
                type="checkbox"
                id="creativeMode"
                className="sr-only"
                checked
                onClick={() => handleOnClick()}
              />
            ) : (
              <input
                type="checkbox"
                id="creativeMode"
                className="sr-only"
                checked={false}
                onClick={() => handleOnClick()}
              />
            )}
            <div className="toggleEl block h-8 w-14 rounded-full bg-gray-600"></div>
            <div className="dot absolute left-1 top-1 h-6 w-6 rounded-full bg-iexwhite transition"></div>
          </div>
          Creative mode
        </label>
      </div>
    </>
  );
};

export default OnOffToggleButton;
