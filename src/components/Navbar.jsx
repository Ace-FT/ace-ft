import React, {useContext} from 'react';
import { AceContext } from '../context/context';
import { shortenAddress } from '../utils/shortenAddress';

const NavBar = () => {
    const {connectWallet, connectedAccount } = useContext(AceContext);
    console.log(connectedAccount);

    return (
      <div className="text-white">
        <nav className="flex justify-between p-8">
          <div>
            <h1 className="text-4xl font-bold">ACE</h1>
          </div>
          {connectedAccount ? (
            <div className="flex items-center">
              <button
                className="rounded-l-md border-r border-gray-200 bg-white text-black px-6 py-2"
                onClick={() => {}}
              >
                My inbox
              </button>
              <button
                className="border-r border-gray-200 bg-white text-black px-6 py-2"
                onClick={() => {}}
              >
                Sent items
              </button>
              <button
                className="rounded-r-md bg-white text-black px-6 py-2"
                onClick={() => {}}
              >
                Settings
              </button>
              <p className="mx-8">Hello! {shortenAddress(connectedAccount)} 👋</p>
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