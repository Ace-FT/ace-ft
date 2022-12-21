import { disconnect } from "process";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AceContext } from "../context/context";
import { shortenAddress } from "../utils/shortenAddress";
import OnOffToggleButton from "../components/OnOffToggleButton";
import { copyTextToClipboard } from "../utils/copyToClipboard";
import ReactTooltip from 'react-tooltip';

const NavBar = () => {
  const { connectWallet, connectedAccount } = useContext(AceContext);

  const copyAddressToClipboard = ()=>{
    document.getElementById("walletAddressContainer").innerHTML = `Copied! ${shortenAddress(connectedAccount)} 👋` ;
    
    setTimeout(()=>{
      document.getElementById("walletAddressContainer").innerHTML = `Hello! ${shortenAddress(connectedAccount)} 👋` ;
    }, 1000)

    copyTextToClipboard(connectedAccount) ;
  }

  return (
    <>
      <div className="flex w-full items-center justify-center bg-iexblk">
        <div className="top-container">
          <div className="flex items-center">
          <img src="/logo512.png" className="app-logo" /><div className="logo-container h-6 flex-none text-left font-logo text-xl not-italic">
             Ace File Transfer
            </div>
            <nav className="top-navigation">
              <ul className="flex list-none">
                <li>
                  <NavLink to="/" relative="path">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/inbox" relative="path">
                    Inbox
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/sent" relative="path">
                    Sent
                  </NavLink>
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
