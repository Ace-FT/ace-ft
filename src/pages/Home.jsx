import React, { useContext, useEffect } from 'react';
import SendForm from "../components/SendForm/SendForm";
import { AceContext } from '../context/context';
import { useState } from 'react';
import crypto from 'crypto-browserify';

function Home() {
  const { isLoading, setIsLoading, state, background, bgCreator, bgUrls, bgCreatorSocial, imgUrl, checkFileAvailability, selectedFiles } = useContext(AceContext);

  const [message, setMessage] = useState("")

  const writeStatus = (status) => {
    return (
      <span>{status}</span>
    )
  }

  useEffect(() => {
    writeStatus(state)
  }, [state])

  // useEffect(() => {
  //   fetch("http://localhost:5001/")
  //     .then((res) => res.json())
  //     .then((data) => setMessage(data.message));
  // }, []);




  // Difining algorithm
  const algorithm = 'aes-256-cbc';

  // Defining key
  const key = crypto.randomBytes(32);

  // An encrypt function
  function fr7encrypt(text) {

      // Defining iv
    const iv = crypto.randomBytes(16);


    // Creating Cipheriv with its parameter
    let cipher =
      crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);

    // Updating text
    let encrypted = cipher.update(text);

    // Using concatenation
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    // Returning iv and encrypted data
    return {
      iv: iv.toString('hex')
      ,
      //encryptedData: encrypted.toString('hex')
      encryptedData: encrypted
    };
  }

  // A decrypt function
  function fr7decrypt(text) {

    let iv = Buffer.from(text.iv, 'hex');
    //let encryptedText =
    //  Buffer.from(text.encryptedData, 'hex');

    let encryptedText =
        Buffer.from(text.encryptedData);

    // Creating Decipher
    let decipher = crypto.createDecipheriv(
      'aes-256-cbc', Buffer.from(key), iv);

    // Updating encrypted text
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    // returns data after decryption
    return decrypted;
  }


  var saveData = (function () {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function (blobdata, fileName) {
      console.log("blobdata", blobdata) ;

      var url = window.URL.createObjectURL(blobdata);
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    };
  }());


  const testEncrypt = async () => {


    // Encrypts output
    /*var output = fr7encrypt("GeeksforGeeks");
    console.log(output);

    // Decrypts output
    console.log(fr7decrypt(output));*/

    let selectedFile = selectedFiles[0];

    const fileBytes = await new Promise(async (resolve, reject) => {
      const fileReader = new FileReader();
      await fileReader.readAsArrayBuffer(selectedFile);
      fileReader.onload = (e) => { resolve(e.target.result) }
      fileReader.onerror = () => reject(Error(`Error`))
      fileReader.onabort = () => reject(Error(`Error : aborded`))
    });

    let arr =  new Uint8Array(fileBytes)
    console.log("arraybuff", arr) ;

    
    var output = fr7encrypt(arr);
    console.log("output", output);

    // Decrypts output
    let decrypted = fr7decrypt(output) ;
    console.log("decrypted", decrypted);

    let blob = new Blob([decrypted], {type: 'application/octet-stream'});
    saveData(blob, "poly.pdf") ;

  }

  return (
    <div className="flex flex-col mt-16 mx-8">
      <div className="flex">
        <SendForm />
        {isLoading ? (
          <div className="flex">
            <div className="w-8 h-8 border-4 border-gray-400 rounded-full border-t-blue-700 animate-spin pr-4"></div>
            {writeStatus(state)}
          </div>
        ) : (
          <p></p>
        )}
      </div>

      <div className="text-white">
        <button className="rounded-l-full rounded-r-full border border-white ml-8 px-4 py-2"
          onClick={(e) => {
            testEncrypt();
          }}
        >
          TEST ENCRYPT
        </button>

        <button className="rounded-l-full rounded-r-full border border-white ml-8 px-4 py-2"
          onClick={(e) => {
            e.preventDefault();
            console.log(bgCreator)
            console.log(background.user)
          }}
        >
          Test bg creator
        </button>
        <button className="rounded-l-full rounded-r-full border border-white ml-8 px-4 py-2"
          onClick={(e) => {
            e.preventDefault();
            console.log(bgUrls)
            console.log(bgUrls.full)

          }}
        >
          Test bg Urls
        </button>
      </div>
      <div className="fixed right-0 bottom-0 flex flex-col text-sm font-extralight p-16">
        <h4>Credits</h4>
        <p>{bgCreator.id}</p>
        <p>{bgCreator.name}</p>
        <p>{bgCreator.username}</p>
        {bgCreatorSocial ? (
          <p>Instagram : {bgCreatorSocial.instagram_username}</p>
        ) : (
          <div></div>
        )}

      </div>
    </div>
  )
}

export default Home;