import { createContext, useEffect, useState } from "react";

export const AceContext = createContext();

const { ethereum } = window;

export const AceProvider = ({children}) => {
    const [connectedAccount, setConnectedAccount] = useState('');
    const [addressTo, setAddressTo] = useState('');
    const [price, setPrice] = useState();
    const [message, setMessage] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);

    useEffect(() => { 
       //checkIsWalletConnected();
    })

    const checkIsWalletConnected = async () => {
        try {
            if (!ethereum) {
                alert("Please install Metamask plugin");
            }
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            if (accounts.length) {
                setConnectedAccount(accounts[0]);
            } else {
                console.log("No accounts found");
            }
            
        } catch (e) {
            console.log(e);
        }
    }

    const connectWallet = async () => {
        try {
            if (!ethereum) {
                alert("Please install Metamask plugin");
            }
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            if (accounts.length) {
                setConnectedAccount(accounts[0]);
                //window.location.reload();
            } else {
                console.log("No accounts found");
                throw new Error("no Ethereum object")
            }
            
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <AceContext.Provider
            value={{
                connectWallet,
                connectedAccount,
                addressTo,
                setAddressTo,
                price,
                setPrice,
                message,
                setMessage,
                selectedFiles,
                setSelectedFiles
            }}
        >
            {children}
        </AceContext.Provider>
    )
}