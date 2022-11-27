import React from "react";

const Footer = () => {
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="footer-container">
          <footer>
            <div className="justify-right ml-auto flex basis-1/3">
              <div className="ml-auto mr-0 flex items-center font-logo text-xs">
                <p className="mr-2 text-right">Powered by iExec</p>
                <img src={require("../assets/cropped-favicon-192x192.png")} alt="iExec logo" className="h-4" />
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Footer;