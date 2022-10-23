import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';
import { AceContext } from '../context/context';
import { shortenAddress } from '../utils/shortenAddress';

const NavBar = () => {
    const {connectWallet, connectedAccount } = useContext(AceContext);
    //console.log(connectedAccount);

    return (
      <div className="text-white">
        <nav className="flex justify-between p-8">
          <div>
            <h1 className="text-4xl font-bold">
              <NavLink to="/">ACE</NavLink>
            </h1>
          </div>
          {connectedAccount ? (
            <div className="flex items-center">
              <NavLink
                className="rounded-l-md border-r border-gray-200 bg-white text-black px-6 py-2"
                activeclassname="is-active"
                to="/inbox"
              >
                My inbox
              </NavLink>
              <NavLink
                className="border-r border-gray-200 bg-white text-black px-6 py-2"
                activeclassname="is-active"
                to="/sent"
              >
                Sent items
              </NavLink>
              <NavLink
                className="rounded-r-md bg-white text-black px-6 py-2"
                activeclassname="is-active"
                to="/settings"
              >
                Settings
              </NavLink>
              <p className="mx-8">Hello! {shortenAddress(connectedAccount)} 👋 </p>
            </div>
          ) : (
            <button
              className="rounded-md bg-white text-black px-6 py-2"
              onClick={connectWallet}
            >
              Connect Wallet
            </button>
          )}
        </nav>
      </div>
    );
}

export default NavBar;