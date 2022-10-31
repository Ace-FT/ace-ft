import { create } from "ipfs-http-client";
import { Buffer } from "buffer";
// import { datasetStruct } from "../utils/datasetStruct.ts";
import * as ace from "../../shared/constants";

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

/**
 * Upload the encrypted file or data to IPFS.
 * @param {Buffer} encrypted encrypted data to upload
 * @returns the IPFS location file URL
 */
const uploadData = async (encrypted) => {
  //UPLOADING
  const uploaded = await client.add(encrypted, {
    progress: (prog) => console.log(`received: ${prog}`),
  });

  console.log(uploaded);
  console.log(`https://infura-ipfs.io/ipfs/${uploaded.path}`);

  const url = `https://infura-ipfs.io/ipfs/${uploaded.path}`;
  return url;
};

export default uploadData;