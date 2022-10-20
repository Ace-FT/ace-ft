import { createContext, useEffect, useState } from "react";
import { IExec } from 'iexec';
//import { create } from 'ipfs-http-client';

export const AceContext = createContext();

const { ethereum } = window;
const iexec = new IExec({ ethProvider: window.ethereum });


export const AceProvider = ({children}) => {

    const [connectedAccount, setConnectedAccount] = useState('');
    const [addressTo, setAddressTo] = useState('');
    const [price, setPrice] = useState();
    const [message, setMessage] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [background, setBackground] = useState({});
    const [bgCreator, setBgCreator] = useState({});
    const [bgUrls, setBgUrls] = useState({});
    const [bgCreatorSocial, setBgCreatorSocial] = useState({});


    useEffect(() => { 
       //checkIsWalletConnected();
       fetchImages();
    }, [])
    
    const fetchImages = async () => {
        try {
            //const response = await fetch(`http://api.unsplash.com/photos?client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`)
            const response = await fetch(`http://api.unsplash.com/photos/random?query=sustainability&count=5&orientation=landscape&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY2}`)
            const data = await response.json();
            //console.log('success');
            const bg = data[3];
            const creator = bg.user
            setBackground(bg)
            setBgCreator(creator)
            setBgUrls(bg.urls);
            setBgCreatorSocial(creator.social)
            /*
            console.log(bg)
            console.log(bg.id)
            console.log(bg.user)
            var backgroundCreatorName = background.user.name;
            this.backgroundCreatorUsername = background.user.username;
            console.log(backgroundCreatorName);
            console.log(this.backgroundCreatorUsername); //OK
            return data[1];*/
        } catch(e) {
            console.log(e)
        }
    }


    // const checkIsWalletConnected = async () => {
    //     try {
    //         if (!ethereum) {
    //             alert("Please install Metamask plugin");
    //         }
    //         const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    //         if (accounts.length) {
    //             setConnectedAccount(accounts[0]);
    //         } else {
    //             console.log("No accounts found");
    //         }
            
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

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
    //const client = create();
    const encryption = async () => {
        //// --------------------------------------  GENERATE AN ENCRYPTION KEY  
        try {
        const key = iexec.dataset.generateEncryptionKey();
        console.log(key);
        console.log(selectedFiles)
        console.log(selectedFiles[0])
        console.log(selectedFiles[0].name)
        const fileBytes = await new Promise(async (resolve, reject) => {
            const fileReader = new FileReader();
            await fileReader.readAsArrayBuffer(selectedFiles[0]);
            fileReader.onload = (e) => { resolve(e.target.result) }
            fileReader.onerror = () => reject(Error(`Error`))
            fileReader.onabort = () => reject(Error(`Error : aborded`))
        });
        console.log(fileBytes)
        const encrypted = await iexec.dataset.encrypt(fileBytes, key);
        console.log(encrypted)
        const checksum = await iexec.dataset.computeEncryptedFileChecksum(encrypted)
        console.log(checksum)
        } catch (err) {
        console.log(err);
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
                setSelectedFiles,
                background,
                setBackground,
                bgCreator,
                bgUrls,
                setBgUrls,
                bgCreatorSocial,
                setBgCreatorSocial,
                encryption
            }}
        >
            {children}
        </AceContext.Provider>
    )
}