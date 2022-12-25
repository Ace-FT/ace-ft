import { create } from "ipfs-http-client";
import { Buffer } from "buffer";
import * as ace from "../../shared/constants";
import { jsonToBuffer } from "../../utils/jsonToBuffer";
const IS_DEBUG = process.env.REACT_APP_IS_DEBUG === 'true';

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
        "Access-Control-Allow-Origin": ["*"]
    },
});

/**
 * Upload the encrypted file or data to IPFS.
 * @param {*} encrypted encrypted data to upload
 * @returns the IPFS location file URL
 */
const uploadData = async(encrypted) => {
    //UPLOADING
    console.log("encrypted", encrypted) ;

    const uploaded = await client.add(encrypted, {
        progress: (prog) => { 
           if(IS_DEBUG) console.log(`received: ${prog}`)
        }
    });

    const url = `https://infura-ipfs.io/ipfs/${uploaded.path}`;

    if(IS_DEBUG) console.log("uploaded", uploaded, "url", url);

    return url;
};

export default uploadData;