import { disconnect } from "process";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AceContext } from "../context/context";
import { shortenAddress } from "../utils/shortenAddress";

const NavBar = () => {
  const { connectWallet, connectedAccount } = useContext(AceContext);
  //console.log(connectedAccount);

  return (
    <>

<div class="flex items-center justify-center mt-2 mb-s">
  <div class="top-container">
        <div class="items-center flex">
          <div class="logo-container font-logo text-xl h-6 flex-none not-italic text-left">
            Ace File Transfer
          </div>
            <nav class="top-navigation">
              <ul>
                <li>
                <NavLink to="/#" relative="path">Home</NavLink>
                </li>
                <li>
                <NavLink to="/inbox" relative="path">Inbox</NavLink>
                </li>
                <li>
                <NavLink to="/sent" relative="path">Sent</NavLink>
                </li>
                <li>
                <NavLink to="/settings" relative="path">Account</NavLink>
                </li>
              </ul>
            </nav>
          </div>
          <div class="top-right justify-center">
            {connectedAccount ? (
              <div className="items-center">
                <p className="mx-8 text-iexwhite">
                  Hello! {shortenAddress(connectedAccount)} 👋{" "}
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
