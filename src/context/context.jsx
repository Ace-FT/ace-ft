import { createContext, useEffect, useState } from "react";
import { IExec } from "iexec";
import { create } from "ipfs-http-client";
import { Buffer } from "buffer";
import { delay } from "../utils/delay";
import { datasetStruct } from "../utils/datasetStruct.ts";
import { jsonToBuffer } from "../utils/jsonToBuffer";

export const AceContext = createContext();

const { ethereum } = window;
const iexec = new IExec({ ethProvider: window.ethereum });
var fileEncryptionKey = "";
var datasetEncryptionKey = "";

export const AceProvider = ({ children }) => {
  const [connectedAccount, setConnectedAccount] = useState("");
  const [addressTo, setAddressTo] = useState("");
  const [price, setPrice] = useState();
  const [message, setMessage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [background, setBackground] = useState({});
  const [bgCreator, setBgCreator] = useState({});
  const [bgUrls, setBgUrls] = useState({});
  const [bgCreatorSocial, setBgCreatorSocial] = useState({});
  const [imgUrl, setImgUrl] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const [datasetUrl, setDatasetUrl] = useState("");

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
    //checkIsWalletConnected();
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      //const response = await fetch(`http://api.unsplash.com/photos?client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`)
      const response = await fetch(
        `http://api.unsplash.com/photos/random?query=sustainability&count=5&orientation=landscape&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`
      );
      const data = await response.json();
      //console.log('success');
      const bg = data[3];
      const creator = bg.user;
      setBackground(bg);
      setBgCreator(creator);
      setBgUrls(bg.urls);
      setBgCreatorSocial(creator.social);
      /*
            console.log(bg)
            console.log(bg.id)
            console.log(bg.user)
            var backgroundCreatorName = background.user.name;
            this.backgroundCreatorUsername = background.user.username;
            console.log(backgroundCreatorName);
            console.log(this.backgroundCreatorUsername); //OK
            return data[1];*/
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


  const encryption = async () => {  
    try {
      // ENCRYPTION
      console.log(auth);
      //console.log(process.env)
      //console.log("INFURA_ID: " + process.env.REACT_APP_INFURA_ID);
      //console.log("INFURA_SECRET_KEY: " + process.env.REACT_APP_INFURA_SECRET_KEY);

      fileEncryptionKey = iexec.dataset.generateEncryptionKey();
      console.log("Encryption key: " + fileEncryptionKey);
      console.log(selectedFiles[0])
      const fileBytes = await new Promise(async (resolve, reject) => {
          const fileReader = new FileReader();
          await fileReader.readAsArrayBuffer(selectedFiles[0]);
          fileReader.onload = (e) => { resolve(e.target.result) }
          fileReader.onerror = () => reject(Error(`Error`))
          fileReader.onabort = () => reject(Error(`Error : aborded`))
      });
      console.log(fileBytes)
      const encrypted = await iexec.dataset.encrypt(fileBytes, fileEncryptionKey);
      console.log(encrypted)
      return encrypted;
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Upload the encrypted file or data to IPFS.
   * @param {Buffer} encrypted encrypted data to upload
   * @returns the IPFS location file URL
   */
  const upload = async (encrypted) => {
    //UPLOADING
    const uploaded  = await client.add(encrypted, { progress: (prog) => console.log(`received: ${prog}`)})

    // const uploaded = await client.add(selectedFiles[0], {
    //   progress: (prog) => console.log(`received: ${prog}`),
    // });
    console.log(uploaded);
    console.log(`https://infura-ipfs.io/ipfs/${uploaded.path}`);

    const url = `https://infura-ipfs.io/ipfs/${uploaded.path}`;    
    setImgUrl(url);
    return url;
  }

  const checkFileAvailability = async (url, _callback) => {
    try {
      const response = await fetch(url, {
        method: "HEAD",
        cache: "no-cache",
      });
      const ok = response.status === 200;
      await delay(2)
      _callback()
      return ok ; // If status is 200, then it's OK
    } catch (error) {
      console.log(error);
      return false;
    }
  };


  /**
   * Encrypt the dataset containing the file encryption Key, the file Url download location and the message. 
   * @returns 
   */
  const datasetEncryption = async () => {
    datasetEncryptionKey = iexec.dataset.generateEncryptionKey();
    console.log("Dataset encryption key: " + datasetEncryptionKey);
    var datasetContent = datasetStruct(fileEncryptionKey, imgUrl, message);
    console.log("Dataset content :", datasetContent)
    const datasetBuffer = jsonToBuffer(datasetContent);
    console.log(datasetBuffer)
    const encryptedDataset = await iexec.dataset.encrypt(datasetBuffer, datasetEncryptionKey);
    console.log(encryptedDataset)
    return encryptedDataset;
  }


  const generateChecksum = async (encrypted) => {
    const checksum = await iexec.dataset.computeEncryptedFileChecksum(encrypted)
    console.log(checksum)
    return checksum;
  }


  // DEPLOYING DATASET
  const deployDataset = async (name, multiaddr, checksum) => {
    //const checksum = generateChecksum(encrypted)
    try {
      const owner = await iexec.wallet.getAddress();
      console.log(imgUrl)
      const { address } = await iexec.dataset.deployDataset({
        owner,
        name,
        multiaddr,
        checksum,
      });
      console.log("Dataset deployed at ", address);

      // VERIFICATION DATASET DEPLOYMENT
      await delay(2)
      console.log(await iexec.dataset.showDataset(address))
      return address;
      // ...............................
    } catch (err) {
      console.error(err);
    } 
  }


  const pushSecret = async (address) => {
    try {
      const pushed = await iexec.dataset.pushDatasetSecret(address, datasetEncryptionKey);
      console.log("Encryption key pushed ", pushed);
    } catch (error) {
      console.log(error);
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
        encryption,
        imgUrl,
        setImgUrl,
        checkFileAvailability,
        delay,
        isAvailable,
        setIsAvailable,
        upload,
        generateChecksum,
        datasetEncryption,
        deployDataset,
        pushSecret
      }}
    >
      {children}
    </AceContext.Provider>
  );
};
