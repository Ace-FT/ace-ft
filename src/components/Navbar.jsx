import { disconnect } from "process";
import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Web3Auth } from "@web3auth/modal";
import { walletLogin, walletLogout } from "../shared/web3AuthLogin"
import { AceContext } from "../context/context";
import { shortenAddress } from "../utils/shortenAddress";
import OnOffToggleButton from "../components/OnOffToggleButton";
import { copyTextToClipboard } from "../utils/copyToClipboard";
import { setModalContent } from "./Modal/ModalController";
import fetchData from "../shared/fetchData";
import { countPendingInboxItems } from "../shared/itemMapper";
import { inboxDatasetsQuery } from "../shared/queries.ts";
import structureResponse from "../utils/structureResponse";
import * as ace from "../shared/constants";

import Modal from "./Modal/Modal";

import ReactTooltip from 'react-tooltip';
import ProfileIdentifier from "./ProfileIdentifier";

const NavBar = () => {
  const IS_DEBUG = process.env.REACT_APP_IS_DEBUG === 'true';

  const { connectWallet, connectedAccount, setConnectedAccount, setW3authPrivatekey, setWeb3authConnectedAccount, setUserInfo } = useContext(AceContext);
  const [pendingCount, setPendingCount] = useState("");

  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  const copyAddressToClipboard = () => {
    document.getElementById("walletAddressContainer").innerHTML = `Copied! ${shortenAddress(connectedAccount)} 👋`;

    setTimeout(() => {
      document.getElementById("walletAddressContainer").innerHTML = `<><ProfileIdentifier /><>`;
    }, 1000)

    copyTextToClipboard(connectedAccount);
  }

  const showModalNotConnected = (() => {
    setModalContent("navbar-modal", "Connection is required ❌", "Please connect your wallet to acces this menu option!", true);
  });

  useEffect(() => {
      const countPending = (async () => {

        console.log("Use effect", new Date(), "connectedAccount", connectedAccount, "ace.POLLING_INTERVAL_BADGE", ace.POLLING_INTERVAL_BADGE, "connectedAccount", connectedAccount);

        if (connectedAccount && connectedAccount !== "") {
          console.log("CA", connectedAccount)
          try {
            const query = inboxDatasetsQuery(null, connectedAccount);

            if (IS_DEBUG) console.log("Use effect", new Date(), "query", query);

            let ret = await fetchData(query);
            let structuredResponse = structureResponse(ret.data);
            if (IS_DEBUG) console.log("Calling fecthdata from NAVBAR", structuredResponse);

            let count = await countPendingInboxItems(connectedAccount, structuredResponse)
            if (IS_DEBUG) console.log("PENDING count", count)

            setPendingCount(count);
          }
          catch (exc) {
            console.error(exc);
          }
          finally {
            //  setIsLoading(false);
          }
        }
      });

      const refreshInterval = setInterval(countPending, ace.POLLING_INTERVAL_BADGE);

      if (!connectedAccount || connectedAccount === "") {
        clearInterval(refreshInterval);
      }

    }, [connectedAccount]);
  
    useEffect(()=>{}, [connectedAccount])
    
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };

  return (
    <>
      <Modal id="navbar-modal" closeHand />
      <div className={`flex w-full items-center justify-center ${isLandingPage ? 'bg-white' : 'bg-iexblk'}`}>
        <div className="top-container">
          { !isLandingPage ? (
            <>
            <div className="flex items-center">
            <img src="/logo512.png" className="app-logo" />
            <div className="logo-container h-6 flex-none text-left font-logo text-xl not-italic">
              Ace File Transfer
            </div>
            <nav className="top-navigation">
              <ul className="flex list-none">
                <li>
                  <NavLink to="/home" relative="path">Home</NavLink>
                </li>
                <li>
                  {connectedAccount ?
                    (
                      <NavLink to="/inbox" relative="path">Inbox&nbsp;
                         {pendingCount!="" && (<span class="badge text-xs px-1 bg-red-500 text-white-100 rounded-full">{pendingCount}</span>)}
                      </NavLink>) :
                    (<span onClick={showModalNotConnected}>Inbox</span>)}
                </li>
                <li>
                  {connectedAccount ? (<NavLink to="/sent" relative="path">Sent</NavLink>) : (<span onClick={showModalNotConnected}>Sent</span>)}
                </li>
                {/* <li>
                  {connectedAccount && (<NavLink to="/info" relative="path">Info</NavLink>)}
                </li> */}
              </ul>
            </nav>
          </div>
          <div>
            <OnOffToggleButton />
          </div>
          <div className="cursor-pointer" onClick={() => window.open("https://t.me/ace_ft_bot")}>
            {/* <NavLink to="/settings" relative="path"> */}
            <img src="/tg.png" className="tg-logo" />
            &nbsp;Notification bot
            {/* </NavLink> */}
          </div>
            </>
          ) : (
            <>
              <div className="flex items-center">
                <img src="/logo512.png" className="app-logo" />
                <div className="logo-container h-6 flex-none text-left font-logo text-xl not-italic text-iexblk">
                  Ace File Transfer
                </div>
                {/* <nav className="top-navigation">
                  <ul className="flex list-none">
                    <li>
                      <NavLink to="/home" relative="path">Home</NavLink>
                    </li>
                    <li>
                      {connectedAccount ?
                        (
                          <NavLink to="/inbox" relative="path">Inbox&nbsp;
                            {pendingCount!="" && (<span class="badge text-xs px-1 bg-red-500 text-white-100 rounded-full">{pendingCount}</span>)}
                          </NavLink>) :
                        (<span onClick={showModalNotConnected}>Inbox</span>)}
                    </li>
                    <li>
                      {connectedAccount ? (<NavLink to="/sent" relative="path">Sent</NavLink>) : (<span onClick={showModalNotConnected}>Sent</span>)}
                    </li>
                  </ul>
                </nav> */}
              </div>
            </>
          )}

          <div className="flex max-w-2/10 basis-1/5">
            {connectedAccount ? (
              <div className="flex ml-auto items-center" >
                <ReactTooltip multiline="true" />
                <p className="ml-8 text-right"
                  // onClick={copyAddressToClipboard}
                >
                  <ProfileIdentifier />
                </p>
                {/* <img src="/exit_logo2.svg" alt="Exit logo"
                  className="ml-3 w-4 clickable"
                  onClick={async () => {
                    const walletInfo = await walletLogout();
                    setWeb3authConnectedAccount(walletInfo.address) 
                    setConnectedAccount(walletInfo.address)
                    setW3authPrivatekey("")
                  }} /> */}
              </div>
            ) : (
              <button
                className="btn ml-auto h-8 text-l font-bold"
                onClick={async () => {
                  const walletInfo = await walletLogin();
                  console.log("walletInfo", walletInfo);
                  setWeb3authConnectedAccount(walletInfo.address)
                  setUserInfo(walletInfo.userInfo)
                  setConnectedAccount(walletInfo.address)
                  setW3authPrivatekey(walletInfo.pk)
                }}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;