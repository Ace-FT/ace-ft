import { Buffer } from "buffer";
const IS_DEBUG = process.env.REACT_APP_IS_DEBUG === 'true';

export function jsonToBuffer(array) {
  var buf = Buffer.from(JSON.stringify(array));

  if (IS_DEBUG) console.log("Real Buffer " + buf);
  return buf;
}
