import React from 'react';

const NavBar = () => {
    return (
        <div className="text-white">
            <nav className="flex justify-between mx-8 p-8">
                <div>
                    <h1 className="text-4xl font-bold">ACE</h1>
                </div>
                <div>
                    <button className="rounded-md bg-white text-black px-6 py-2">Connect wallet</button>
                </div>
            </nav>
        </div>
    )
}

export default NavBar;