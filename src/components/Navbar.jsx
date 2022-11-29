import { disconnect } from "process";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AceContext } from "../context/context";
import { shortenAddress } from "../utils/shortenAddress";
import OnOffToggleButton from "../components/OnOffToggleButton";

const NavBar = () => {
  const { connectWallet, connectedAccount } = useContext(AceContext);
  //console.log(connectedAccount);

  return (
    <>
      <div className="flex w-full items-center justify-center bg-iexblk">
        <div className="top-container">
          <div className="flex items-center">
            <div className="logo-container h-6 flex-none text-left font-logo text-xl not-italic">
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
              <div className="ml-auto items-center">
                <p className="ml-8 text-right">
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
