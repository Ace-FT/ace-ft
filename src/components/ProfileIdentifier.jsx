import { disconnect } from "process";
import React, { useContext, useEffect, useState } from "react";
import { walletLogin, walletLogout } from "../shared/web3AuthLogin";
import { AceContext } from "../context/context";
import { copyTextToClipboard } from "../utils/copyToClipboard";
import { shortenAddress } from "../utils/shortenAddress";

const ProfileIdentifier = () => {
  const IS_DEBUG = process.env.REACT_APP_IS_DEBUG === "true";
  const {
    connectedAccount,
    setConnectedAccount,
    setW3authPrivatekey,
    setWeb3authConnectedAccount,
    userInfo,
  } = useContext(AceContext);

  const [isOpen, setIsOpen] = useState(false);

  const copyAddressToClipboard = () => {
    document.getElementById("walletAddressContainer").innerHTML = `Copied! ${shortenAddress(connectedAccount)} 👋`;

    setTimeout(() => {
      document.getElementById("walletAddressContainer").innerHTML = `<><ProfileIdentifier /><>`;
    }, 1000)

    copyTextToClipboard(connectedAccount);
  }

  
  useEffect(() => {
    console.log(userInfo.name)
  }, [userInfo])
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div id="profile-identifier" className="flex items-center justify-end">
        <ul>
          <li className="deroulant relative">
            <a>
              {userInfo && userInfo.name ? (
                <div className="flex items-center">
                  {userInfo.name}
                  <img src={userInfo.profileImage} className="ml-3 w-1/5 rounded-full" />
                  <img src="/dropdown-logo.png" className="ml-3 h-4"/>
                </div>
              ) : (
                <div className="flex items-center">
                  {shortenAddress(connectedAccount)}
                  <img src="#" className="ml-3 w-1/5 rounded-full" />{/* Ethereum logo */}
                </div> 
              )}
            </a>
            <ul className="sous">
              <li className="cursor-pointer px-4 py-2 hover:bg-gray-100" onClick={copyAddressToClipboard}>
                {shortenAddress(connectedAccount)}
              </li>
              <li className="cursor-pointer px-4 py-2 hover:bg-gray-100">
                Info
              </li>
              <li
                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                onClick={async () => {
                  const walletInfo = await walletLogout();
                  setWeb3authConnectedAccount(walletInfo.address);
                  setConnectedAccount(walletInfo.address);
                  setW3authPrivatekey("");
                }}
              >
                Logout
              </li>
            </ul>
          </li>
        </ul>
        {/* <div className="flex items-center justify-center mx-3 clickable" onClick={copyAddressToClipboard} id="walletAddressContainer" data-tip="Click to copy">
          {userInfo && userInfo.name ? (
            <>
              {userInfo.name}
              <img src={userInfo.profileImage} className="ml-3 w-1/5 rounded-full" />
            </>
          ) : (
            <>
              {shortenAddress(connectedAccount)}
              <img src="#" className="ml-3 w-1/5 rounded-full" />{/* Ethereum logo */}
            {/* </> 
          {/* )}
        </div>

        <button
          onClick={toggleMenu}
          className="text-white focus:outline-none ml-2"
          aria-label="Menu"
        >
          {/* Utilisez une icône de flèche vers le bas ici (par exemple, un emoji flèche vers le bas) */}
          {/* ▼
        </button> */}
        {/* {isOpen && (
          <div id="arrow-menu" className="mt-2 rounded-lg bg-iexwhite text-iexblk shadow-lg block">
            <ul className="py-2">
              <li className="cursor-pointer px-4 py-2 hover:bg-gray-100">
                {shortenAddress(connectedAccount)}
              </li>
              <li className="cursor-pointer px-4 py-2 hover:bg-gray-100">
                Info
              </li>
              <li
                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                onClick={async () => {
                  const walletInfo = await walletLogout();
                  setWeb3authConnectedAccount(walletInfo.address);
                  setConnectedAccount(walletInfo.address);
                  setW3authPrivatekey("");
                }}
              >
                Logout
              </li>
            </ul>
          </div>
        )} */}
      </div>
    </>
  );
};

export default ProfileIdentifier;