import { createContext, useEffect, useState } from "react";
import { create } from "ipfs-http-client";
import { Buffer } from "buffer";
import { delay } from "../utils/delay";
import { getIexec } from "../shared/getIexec";

import RPC from "../shared/web3RPC"

import { isLightColor } from "../utils/isLightColor";

import { setModalContent } from "../components/Modal/ModalController";
import { initWeb3auth } from "../shared/web3AuthLogin";

export const AceContext = createContext();

const { ethereum } = window;


export const AceProvider = ({ children }) => {
  const [connectedAccount, setConnectedAccount] = useState("");
  const [web3auth, setWeb3Auth] = useState();
  const [web3AuthProvider, setWeb3AuthProvider] = useState();
  const [web3authConnectedAccount, setWeb3authConnectedAccount] = useState("");
  const [w3authPrivatekey, setW3authPrivatekey] = useState("");
  const [userInfo, setUserInfo] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [addressTo, setAddressTo] = useState("");
  const [price, setPrice] = useState();
  const [message, setMessage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [background, setBackground] = useState({});
  const [bgCreator, setBgCreator] = useState({});
  const [creativeMode, setCreativeMode] = useState(true);
  const [backgroundIsLight, setBackgroundIsLight] = useState(true);
  const [bgUrls, setBgUrls] = useState({});
  const [bgCreatorSocial, setBgCreatorSocial] = useState({});
  const [imgUrl, setImgUrl] = useState("");
  const [step, setStep] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const IS_DEBUG = process.env.REACT_APP_IS_DEBUG === 'true';

  const auth = "Basic " + Buffer.from(
    process.env.REACT_APP_INFURA_ID +
    ":" + process.env.REACT_APP_INFURA_SECRET_KEY
  ).toString("base64");


  useEffect(() => {
    fetchImages()
  }, []);



  const getNextIpfsGateway = (ipfsUrl, trycount) => {
    var parts = ipfsUrl.split('/ipfs');
    console.log("parts", parts);

    const gateways = process.env.REACT_APP_IPFS_GATEWAYS.split(',');

    let numNext = trycount % gateways.length
    let nextUrl = gateways[numNext] + parts[1];
    console.log("gateways", gateways, "numNext", numNext, "nextUrl", nextUrl);

    return nextUrl;
  }


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
      setBackgroundIsLight(isLightColor(bg.color));

    } catch (e) {
      console.log(e);
    }
  };


  const connectWallet = async () => {
    try {

      var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

      if (!ethereum) {
        let modalText = "Please install the Metamask plugin." ; 
        modalText += isSafari ? "<br/>Metamask is not currently supported on Safari. Please use another browser like Chrome." : "" ; 
        setModalContent("app-modal", "Metamask missing 🦊", modalText , true);
        return ; 
      }

      let iexec = getIexec();
      
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts.length) {
        setConnectedAccount(accounts[0]);
        // connect to Bellecour iExec network
        try {
          await ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: '0x86' }]
          })
        } catch (switchNetworkError) {
          console.log(switchNetworkError.code)
          // This error code indicates that the chain has not been added to MetaMask.
          if (switchNetworkError.code === 4902) {
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
      console.error(e);
    }
  };


  const initWeb3Modal = async () => {
    // const web3auth = new Web3Auth({
    //   clientId: "BFYmc7bYzgY8_pVWZ2Rxmo5GpR-UoR9TtSVpfzGeQ264uw-5oN9I3ZPeCV9BxQ0J7j3Rv8RtNkK9XiuSlUm24GE",
    //   chainConfig: {
    //     chainNamespace: CHAIN_NAMESPACES.EIP155,
    //     chainId: "0x86",     
    //     rpcTarget: "https://bellecour.iex.ec",
    //     // rpcTarget: "https://rpc.ankr.com/eth",
    //     displayName: "bellecour",
    //     blockExplorer: "https://blockscout-bellecour.iex.ec/"
    //   },
    //   uiConfig: {
    //     loginGridCol: 2
    //   }
    // })
    // await web3auth.initModal();
    const web3auth = await initWeb3auth();
    setWeb3Auth(web3auth)
  }



  const checkFileAvailability = async (url, _callback) => {

    // HACK 
    let options = {
      method: "HEAD",
      cache: "no-cache",
      //mode: "no-cors", 
      //redirect: "follow"
    };

    if (url.indexOf('cloudflare') === -1 && url.indexOf('pinata') === -1) {
      //options.headers =  {"Access-Control-Allow-Origin": ["*"] }
    }
    try {
      if (IS_DEBUG) console.log("fetching url", url, "options", options);

      const response = await fetch(url, options);
      const ok = response.status === 200;

      // await delay(2) ;

      if (IS_DEBUG) console.log("response", response);
      if (IS_DEBUG) console.log("url", url, "response.status", response.status, "response.statusText", response.statusText, "ok", ok);
      _callback()

      return ok; // If status is 200, then it's OK
    } catch (error) {
      console.error(error);
      return false;
    }
  };


  return (
    <AceContext.Provider
      value={{
        connectWallet,
        connectedAccount,
        setConnectedAccount,
        web3authConnectedAccount, setWeb3authConnectedAccount,
        w3authPrivatekey, setW3authPrivatekey,
        userInfo, setUserInfo,
        initWeb3Modal,
        web3auth, setWeb3Auth,
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
        creativeMode,
        setCreativeMode,
        imgUrl,
        setImgUrl,
        step,
        setStep,
        checkFileAvailability,
        isAvailable,
        setIsAvailable,
        getNextIpfsGateway,
        backgroundIsLight,
        setBackgroundIsLight
      }}
    >
      {children}
    </AceContext.Provider>
  );
};