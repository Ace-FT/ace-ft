import React, {useContext} from 'react';
import { AceContext } from '../context/context';

const NavBar = () => {
    const {connectWallet, connectedAccount } = useContext(AceContext);
    console.log(connectedAccount);

    return (
      <div className="text-white">
        <nav className="flex justify-between mx-8 p-8">
          <div>
            <h1 className="text-4xl font-bold">ACE</h1>
          </div>

          {connectedAccount ? (
            <div>
              <p>
                Hello! 👋
              </p>
            </div>
          ) : (
            <button className="rounded-md bg-white text-black px-6 py-2" onClick={connectWallet}>
              Connect Wallet
            </button>
          )}
        </nav>
      </div>
    );
}

export default NavBar;