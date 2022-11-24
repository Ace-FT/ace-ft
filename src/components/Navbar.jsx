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

<div class="top"><div class="top-container">
        <div class="top-left">
          <div class="logo-container">
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
              </ul>
            </nav>
          </div>
          <div class="top-right">
            <a href="/signup">
              <button class="btn" to="/signup">Connect Wallet</button>
            </a>
          </div>
        </div>
      </div>


      <div>
        <nav className="flex text-white justify-between p-8">
         
          {connectedAccount ? (
            <div className="flex items-center">
             
              
              <NavLink
                className="rounded-r-md bg-white text-black px-6 py-2"
                activeclassname="is-active"
                to="/settings"
              >
                My account
              </NavLink>
              <p className="mx-8 text-iexwhite">
                Hello! {shortenAddress(connectedAccount)} 👋{" "}
              </p>
            </div>
          ) : (
            <button
              className="rounded-md bg-secondary px-6 py-2 text-iexblk bg-iexyellow"
              onClick={connectWallet}
            >
              Connect Wallet
            </button>
          )}
        </nav>
      </div>
    </>
  );
};

export default NavBar;
