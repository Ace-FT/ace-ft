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
      <div>
        <nav className="flex justify-between p-8 text-iexwhite">
          <div>
            <h1 className="text-4xl font-bold">
              <NavLink to="/">ACE</NavLink>
            </h1>
          </div>
          {connectedAccount ? (
            <div className="flex items-center">
              <NavLink
                className="rounded-l-md border-r border-gray-200 bg-iexwhite px-6 py-2 text-iexblk"
                activeclassname="is-active"
                to="/inbox"
              >
                My inbox
              </NavLink>
              <NavLink
                className="border-r border-gray-200 bg-iexwhite px-6 py-2 text-iexblk"
                activeclassname="is-active"
                to="/sent"
              >
                Sent items
              </NavLink>
              <NavLink
                className="rounded-r-md bg-iexwhite px-6 py-2 text-iexblk"
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
