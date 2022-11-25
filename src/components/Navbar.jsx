import { disconnect } from "process";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AceContext } from "../context/context";
import { shortenAddress } from "../utils/shortenAddress";
import OnOffToggleButton from '../components/OnOffToggleButton';

const NavBar = () => {
  const { connectWallet, connectedAccount } = useContext(AceContext);
  //console.log(connectedAccount);

  return (
    <>

<div class="flex items-center justify-center mb-s w-full bg-iexblk">
  <div class="top-container">
        <div className="items-center flex">
          <div className="logo-container font-logo text-xl h-6 flex-none not-italic text-left">
            Ace File Transfer
          </div>
            <nav className="top-navigation">
              <ul className="flex list-none">
                <li>
                  <NavLink to="/" relative="path">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/inbox" relative="path">Inbox</NavLink>
                </li>
                <li>
                  <NavLink to="/sent" relative="path">Sent</NavLink>
                </li>
                <li>
                
                </li>
              </ul>
            </nav>
            <div>
            <OnOffToggleButton />
          </div>
          </div>
          <div >
              <NavLink to="/settings" relative="path"><img src="/tg.png" class="tg-logo"/>&nbsp;Notification bot</NavLink>
          </div>
          <div class="basis-1/5 max-w-2/10">
            {connectedAccount ? (
              <div className="items-center">
                <p className="ml-8 text-right">
                  Hello! {shortenAddress(connectedAccount)} 👋
                </p>
              </div>
            ) : 
              <button class="btn" onClick={connectWallet}>Connect Wallet</button>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
