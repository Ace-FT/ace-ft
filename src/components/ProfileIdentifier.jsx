import { disconnect } from "process";
import { getIexec } from "../shared/getIexec";
import React, { useContext, useEffect, useState } from "react";
import { walletLogin, walletLogout } from "../shared/web3AuthLogin";
import { AceContext } from "../context/context";
import { copyTextToClipboard } from "../utils/copyToClipboard";
import { shortenAddress } from "../utils/shortenAddress";

const ProfileIdentifier = () => {
  const IS_DEBUG = process.env.REACT_APP_IS_DEBUG === "true";
  const iexec = getIexec();

  const {
    connectedAccount,
    setConnectedAccount,
    setW3authPrivatekey,
    setWeb3authConnectedAccount,
    userInfo,
  } = useContext(AceContext);

  const [isOpen, setIsOpen] = useState(false);
  const [balance, setBalance] = useState()

  const copyAddressToClipboard = () => {
    document.getElementById("walletAddressContainer").innerHTML = `Copied! ${shortenAddress(connectedAccount)}`;

    setTimeout(() => {
      document.getElementById("walletAddressContainer").innerHTML = `${shortenAddress(connectedAccount)}`;
    }, 1000)

    copyTextToClipboard(connectedAccount);
  }

  useEffect(() => {
    const getBalance = async () => {
      let balance = await iexec.account.checkBalance(connectedAccount);
      console.log("balance,", balance.stake.toString())
      
      const newBalance = parseInt(balance.stake.toString());
      console.log(newBalance)
      setBalance(newBalance/10**9);
    }

    getBalance()
  }, [balance])

  useEffect(() => {
    if (userInfo && userInfo.name) console.log(userInfo.name)
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
                  <img src="./ethlogo.png" className="ml-3 w-1/5 rounded-full" />
                  <img src="/dropdown-logo.png" className="ml-3 h-4"/>
                </div> 
              )}
            </a>
            <ul className="sous">
              <li id="walletAddressContainer" className="flex flex-col cursor-pointer px-4 py-2" onClick={copyAddressToClipboard}>
                <span className="text-xs">
                  Your wallet address
                </span>
                {shortenAddress(connectedAccount)}
              </li>
              <li className="flex flex-col cursor-pointer px-4 py-2 hover:bg-gray-600">
                <span className="text-xs">
                  iExec Account Balance
                </span>
                {balance}
              </li>
              <li className="flex flex-col cursor-pointer px-4 py-2 hover:bg-gray-600" onClick={() => {
                window.open("https://market.iex.ec/")
              }}>
                <span className="text-xs pt-2 flex items-center">
                  Migrate from wallet to account here
                  <svg width="13px" height="13px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" className="mx-2">
                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="External-Link">
                            <rect id="Rectangle" fill-rule="nonzero" x="0" y="0" width="24" height="24"></rect>
                            <path d="M20,12 L20,18 C20,19.1046 19.1046,20 18,20 L6,20 C4.89543,20 4,19.1046 4,18 L4,6 C4,4.89543 4.89543,4 6,4 L12,4" id="Path" stroke="#fcd15a" stroke-width="2" stroke-linecap="round"></path>
                            <path d="M16,4 L19,4 C19.5523,4 20,4.44772 20,5 L20,8" id="Path" stroke="#fcd15a" stroke-width="2" stroke-linecap="round"></path>
                            <line x1="11" y1="13" x2="19" y2="5" id="Path" stroke="#fcd15a" stroke-width="2" stroke-linecap="round"></line>
                        </g>
                    </g>
                  </svg>
                </span>
              </li>
              <li
                className="cursor-pointer px-4 py-2 hover:bg-gray-600"
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
      </div>
    </>
  );
};

export default ProfileIdentifier;