import { createContext, useEffect, useState } from "react";
import { IExec } from "iexec";
import { create } from "ipfs-http-client";
import { Buffer } from "buffer";
import { delay } from "../utils/delay";
import * as ace from "../shared/constants";

export const AceContext = createContext();

const { ethereum } = window;
const iexec = new IExec({ ethProvider: window.ethereum });


export const AceProvider = ({ children }) => {
  const [connectedAccount, setConnectedAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [addressTo, setAddressTo] = useState("");
  const [price, setPrice] = useState(0);
  const [message, setMessage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [background, setBackground] = useState({});
  const [bgCreator, setBgCreator] = useState({});
  const [darkMode, setDarkMode] = useState(true);
  const [bgUrls, setBgUrls] = useState({});
  const [bgCreatorSocial, setBgCreatorSocial] = useState({});
  const [imgUrl, setImgUrl] = useState("");
  const [step, setStep] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const [datasetUrl, setDatasetUrl] = useState("");
  const IS_DEBUG = process.env.REACT_APP_IS_DEBUG == 'true';

  const auth = "Basic " + Buffer.from(
    process.env.REACT_APP_INFURA_ID +
    ":" + process.env.REACT_APP_INFURA_SECRET_KEY
  ).toString("base64");

  const client = create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    //apiPath: "/api/v0",
    headers: {
      authorization: auth,
      "Access-Control-Allow-Origin": ["*"],
    },
  });
  
  useEffect(() => {
    fetchImages()
  }, []);


  const fetchImages = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + '/background'
      );
      const bg = await response.json();
      const creator = bg.user;
      setBackground(bg);
      setBgCreator(creator);
      setBgUrls(bg.urls);
      setBgCreatorSocial(creator.social);

    } catch (e) {
      console.log(e);
    }
  };

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
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts.length) {
        setConnectedAccount(accounts[0]);
        // connect to Bellecour iExec network
        try {
          await ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{chainId: '0x86'}]
          })
        } catch (switchNetworkError) {
          console.log(switchNetworkError.code)
          // This error code indicates that the chain has not been added to MetaMask.
          if(switchNetworkError.code === 4902) {
            // add Bellecour iExec network
            try {
              console.log("Adding")
              await ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: '0x86',
                    chainName: 'bellecour',
                    rpcUrls: ['https://bellecour.iex.ec'],
                    nativeCurrency: {
                      name: "xRLC",
                      symbol: "xRLC", // 2-6 characters long
                      decimals: 18
                    }
                  },
                ],
              });
              console.log("Network added");
            } catch (addError) {
              console.log(`Error ${addError}, impossible to add the network`)
            }
          } else {
            console.log(`Error ${switchNetworkError} : not due to `)
          }
        }

        sessionStorage.setItem('isWalletConnected', true)
        console.log("iExec Address", await iexec.wallet.getAddress())
        //window.location.reload();
      } else {
        console.log("No accounts found");
        throw new Error("no Ethereum object");
      }
    } catch (e) {
      console.log(e);
    }
  };




  const checkFileAvailability = async (url, _callback) => {


    // HACK 
    let options =  {
      method: "HEAD",
      cache: "no-cache"
      //, mode:"no-cors"
    } ;


    if (url.indexOf('cloudflare') ==-1 && url.indexOf('pinata') ==-1)
    {
        //options.headers =  {"Access-Control-Allow-Origin": ["*"] }
    }

    try {

      if (IS_DEBUG) console.log("fetching url", url, "options") ; 

      const response = await fetch(url,options);
      
      const ok = response.status === 200;

      // await delay(2) ;
      
      if (IS_DEBUG)  console.log("url",url, "response.status", response.status , "response.statusText", response.statusText, "ok", ok) ; 
      _callback()
      


      return ok ; // If status is 200, then it's OK
    } catch (error) {
      console.log(error);
      return false;
    }
  };


  const pushOrder = async(address, requesterrestrict) => {
    try {
      const order = await iexec.order.createDatasetorder({ dataset: address, volume: 100, apprestrict: ace.APP_ADDRESS, requesterrestrict: requesterrestrict})
      console.log("Unsigned order",order)
      const signedOrder = await iexec.order.signDatasetorder(order)
      console.log("Signed order", signedOrder)
      const pushedOrder = await iexec.order.publishDatasetorder(signedOrder)
      console.log(pushedOrder);
    } catch (err) {
      console.log(err)
    }
  }




  return (
    <AceContext.Provider
      value={{
        connectWallet,
        connectedAccount,
        setConnectedAccount,
        isLoading,
        setIsLoading,
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
        darkMode,
        setDarkMode,
        imgUrl,
        setImgUrl,
        step,
        setStep,
        checkFileAvailability,
        isAvailable,
        setIsAvailable,
        pushOrder,
      }}
    >
      {children}
    </AceContext.Provider>
  );
};