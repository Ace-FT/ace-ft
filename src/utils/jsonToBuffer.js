import { Buffer } from "buffer";

export function jsonToBuffer(array) {
  var buf = Buffer.from(JSON.stringify(array));

  console.log("Real Buffer " + buf);
  return buf;
}
