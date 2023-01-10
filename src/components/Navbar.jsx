import { disconnect } from "process";
import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
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

const NavBar = () => {
  const IS_DEBUG = process.env.REACT_APP_IS_DEBUG == 'true';

  const { connectWallet, connectedAccount } = useContext(AceContext);
  const [pendingCount, setPendingCount] = useState("");


  const copyAddressToClipboard = () => {
    document.getElementById("walletAddressContainer").innerHTML = `Copied! ${shortenAddress(connectedAccount)} 👋`;

    setTimeout(() => {
      document.getElementById("walletAddressContainer").innerHTML = `Hello! ${shortenAddress(connectedAccount)} 👋`;
    }, 1000)

    copyTextToClipboard(connectedAccount);
  }


  const showModalNotConnected = (() => {
    setModalContent("navbar-modal", "Connection is required ❌", "Please connect your wallet to acces this menu option!", true);
  });

  useEffect(

    () => {
      const countPending = (async () => {

        console.log("Use effect", new Date(), "connectedAccount", connectedAccount);

        if (connectedAccount && connectedAccount != "") {

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

        };

        setTimeout(countPending, ace.POLLING_INTERVAL_BADGE);
      });

      countPending() ;

    }, []);

  

  return (
    <>
      <Modal id="navbar-modal" closeHand />
      <div className="flex w-full items-center justify-center bg-iexblk">
        <div className="top-container">
          <div className="flex items-center">
            <img src="/logo512.png" className="app-logo" /><div className="logo-container h-6 flex-none text-left font-logo text-xl not-italic">
              Ace File Transfer
            </div>
            <nav className="top-navigation">
              <ul className="flex list-none">
                <li>
                  <NavLink to="/" relative="path">Home</NavLink>
                </li>
                <li>
                  {connectedAccount ?
                    (
                      <NavLink to="/inbox" relative="path">Inbox&nbsp;
                         {pendingCount!="" && (<span class="badge text-xs px-1 bg-red-500 text-white-800 rounded-full">{pendingCount}</span>)}
                      </NavLink>) :
                    (<span onClick={showModalNotConnected}>Inbox</span>)}
                </li>
                <li>
                  {connectedAccount ? (<NavLink to="/sent" relative="path">Sent</NavLink>) : (<span onClick={showModalNotConnected}>Sent</span>)}
                </li>
                <li></li>
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
          <div className="flex max-w-2/10 basis-1/5">
            {connectedAccount ? (

              <div className="ml-auto items-center" >

                <ReactTooltip multiline="true" />
                <p className="ml-8 text-right clickable" data-tip="Click to copy" id="walletAddressContainer"
                  onClick={copyAddressToClipboard}
                >
                  Hello! {shortenAddress(connectedAccount)} 👋
                </p>
              </div>
            ) : (
              <button
                className="btn ml-auto h-8 text-l font-bold"
                onClick={connectWallet}
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
