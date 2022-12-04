import * as ace from "../shared/constants";
import { createHash } from "crypto-browserify";
const IS_DEBUG = process.env.REACT_APP_IS_DEBUG == 'true';

const hashIt = (str)=>{
  return createHash('sha256').update(str).digest('hex');
}

export function generateDatasetNameLookup(owner?: string, requesterrestrict?: string) {
  
  let lookupStr = "";

  if (owner)
  {
     let str1 = `${owner}${ace.APP_ADDRESS}`.toLowerCase();
     lookupStr += hashIt(str1) ;
  }

  if (requesterrestrict)
  {
     let str2 = `${ace.APP_ADDRESS}${requesterrestrict}`.toLowerCase();
     lookupStr += hashIt(str2) ;
  }

  return lookupStr;
}

export function generateDatasetName(owner: string, requesterrestrict: string) {

  console.log("generateDatasetName OWNER ", owner, "requesterrestrict", requesterrestrict);

  const str1 = `${owner}${ace.APP_ADDRESS}`.toLowerCase();
  const str2 = `${ace.APP_ADDRESS}${requesterrestrict}`.toLowerCase();

  const hash = `${hashIt(str1)}${hashIt(str2)}`;
  const name = `${hash}${new Date().getTime().toString()}#${requesterrestrict}`
            // file name
  return name;
}
