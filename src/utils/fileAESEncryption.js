import crypto from "crypto-browserify";

// Difining algorithm
const ALGORITHM = "aes-256-cbc";

// Defining key
const fileEncKey = crypto.randomBytes(32);


/**
 * 
 * @param {Uint8Array} file file to encrypt
 * @returns the encrypted file
 */
const fromFileToEncryptedFile = (file) => {
  // Defining iv
  const iv = crypto.randomBytes(16);

  // Creating Cipheriv with its parameter
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(fileEncKey), iv);

  // Updating text
  let encrypted = cipher.update(file);

  // Using concatenation
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  // Returning iv and encrypted data
  return {
    iv: iv.toString("hex"),
    //encryptedData: encrypted.toString('hex')
    encryptedData: encrypted,
  };
}

const fromEnryptedFileToFile = (encryptedFile, key) => {
    const iv = Buffer.from(encryptedFile.iv, 'hex');
    //let encryptedText =
    //  Buffer.from(text.encryptedData, 'hex');

    let encryptedText = Buffer.from(encryptedFile.encryptedData);

    // Creating Decipher
    let decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(key), iv);

    // Updating encrypted text
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    // returns data after decryption
    return decrypted;
}


export { fileEncKey, fromFileToEncryptedFile, fromEnryptedFileToFile }