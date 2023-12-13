import React from "react";
import {useLocation} from "react-router";

const Footer = () => {

  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  return (
    <>
      {isLandingPage ? (
        <div></div>
      ) : (
        <div className="flex items-center justify-center">
          <div className="footer-container">
            <footer>
              <div className="justify-center mx-auto flex basis-1/3">
                <div className="mx-auto flex items-center font-logo text-base">
                  <p className="mx-2 text-center">Powered by iExec</p>
                  <img src={require("../assets/cropped-favicon-192x192.png")} alt="iExec logo" className="h-5" />
                </div>
              </div>
            </footer>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;