import { utils } from "iexec";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { MetamaskAdapter } from "@web3auth/metamask-adapter";
import RPC from "./web3RPC";

export var web3auth;
export var w3AprivateKey;
export var web3authProvider;

export const initWeb3auth = async function () {
  const CLIENT_ID = "BFYmc7bYzgY8_pVWZ2Rxmo5GpR-UoR9TtSVpfzGeQ264uw-5oN9I3ZPeCV9BxQ0J7j3Rv8RtNkK9XiuSlUm24GE";

  const openloginAdapter = new OpenloginAdapter({
    loginSettings: {
      loginProvider: ["linkedin", "facebook", "google", "apple", "reddit"],
    },
  });

  // const metamaskAdapter = new MetamaskAdapter({
  //     clientId: CLIENT_ID,
  //     sessionTime: 7200, // 2 houra in seconds
  //     //web3AuthNetwork: "cyan",
  //     chainConfig: {
  //       chainNamespace: CHAIN_NAMESPACES.EIP155,
  //       chainId: "0x86",
  //       rpcTarget: "https://bellecour.iex.ec", // This is the public RPC we have added, please pass on your own endpoint while creating an app
  //       blockExplorer: "https://blockscout-bellecour.iex.ec/",
  //     },
  //   });

  web3auth = new Web3Auth({
    clientId: CLIENT_ID,
    chainConfig: {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: "0x86",
      rpcTarget: "https://bellecour.iex.ec",
      // rpcTarget: "https://rpc.ankr.com/eth",
      displayName: "bellecour",
      blockExplorer: "https://blockscout-bellecour.iex.ec/",
    },
    uiConfig: {
      loginGridCol: 2,
    },
  });
  web3auth.configureAdapter(openloginAdapter);

  await web3auth.initModal();

  return web3auth;
};

export const walletLogin = async () => {
  if (!web3auth) {
    console.log("web3 auth not initialised yet");
    return;
  }

  const provider = await web3auth.connect();
  web3authProvider = web3auth.provider
  console.log("provider", provider);

  var pk;
  if(!web3auth.provider.isMetaMask) {
    pk = await web3auth.provider.request({
      method: "private_key",
    });

    w3AprivateKey = pk;
  } else {
    console.log("IT IS METAMASK")
  }

  const rpc = new RPC(provider);
  const address = await rpc.getAccounts();
  console.log("address", address);
  console.log("web3auth.provider", web3auth.provider)
  console.log("eth provider", window.ethereum)

  return { provider: provider, address: address[0], pk: pk };
};

export const walletLogout = async () => {
  if (!web3auth) {
    console.log("web3 auth not initialised yet");
    return;
  }

  const provider = await web3auth.logout();
  console.log("provider", provider);

  const address = "";

  return { provider: provider, address: address };
};

export const setIexecProvider = () => {
  if (!web3auth) {
    console.log("web3 auth not initialised yet");
    return;
  }

  if(web3auth.provider.isMetaMask) {
    return web3auth.provider;
  }

  return utils.getSignerFromPrivateKey('https://bellecour.iex.ec', w3AprivateKey);
}