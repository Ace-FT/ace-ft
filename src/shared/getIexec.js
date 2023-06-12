import { IExec } from "iexec";
import {getSignerFromPrivateKey} from "iexec/dist/lib/utils";
import * as ace from "./constants";
import { w3AprivateKey } from "./web3AuthLogin";



var w3provider;

if (w3AprivateKey) {
    w3provider = getSignerFromPrivateKey('https://bellecour.iex.ec', w3AprivateKey);
}


const configArgs = { ethProvider: w3provider, chainId: 134 };
// const configArgs = { ethProvider: window.ethereum, chainId: 134 };
const configOptions = { smsURL: ace.SMS_URL };
const IS_DEBUG = process.env.REACT_APP_IS_DEBUG === 'true';

let iexec = null;

export const getIexec = function (pk) {

    if (iexec === null) {
        if (pk === undefined && w3AprivateKey) {
            w3provider = getSignerFromPrivateKey('https://bellecour.iex.ec', w3AprivateKey);
        }
        const configArgs = { ethProvider: w3provider, chainId: 134 };

        iexec = new IExec(configArgs, configOptions);
        
        
        if (IS_DEBUG) console.log("Created new instance of iExec");
        console.log(iexec)
    }
    else {
        if (IS_DEBUG) console.log("Re-using iexec ");
    }

    return iexec;
}