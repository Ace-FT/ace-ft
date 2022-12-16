import React, { useState, useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import SendForm from "../components/SendForm/SendForm";
import { AceContext } from '../context/context';
import crypto from 'crypto-browserify';
import StepBar from '../components/StepBar';


function Home() {
  const { state, background, bgCreator, bgUrls, bgCreatorSocial, darkMode, imgUrl, checkFileAvailability } = useContext(AceContext);

  const [message, setMessage] = useState("")

  const writeStatus = (status) => {
    return (
      <span>{status}</span>
    )
  }

  useEffect(() => {
    writeStatus(state)
  }, [state])

  // Defining algorithm
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
  function fr7decrypt(enckey, text) {

    let iv = Buffer.from(text.iv, 'hex');
    //let encryptedText =
    //  Buffer.from(text.encryptedData, 'hex');

    let encryptedText =
      Buffer.from(text.encryptedData);

    // Creating Decipher
    let decipher = crypto.createDecipheriv(
      'aes-256-cbc', Buffer.from(enckey), iv);

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
      console.log("blobdata", blobdata);

      var url = window.URL.createObjectURL(blobdata);
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    };
  }());




  const testEncrypt = async () => {

    let fileUrl = 'https://infura-ipfs.io/ipfs/QmQDUxQRv8LBm4nTPG37V2Av44UKg2L3o543YKMJhcjydr';
    let enckey = 'qehKhvP7XAxNLilwF4qm75bIu+322SZ2Gu6mge+jOCg=';

    let responseArray = await fetch(
      fileUrl, { method: 'GET' }
    ).then((response) => {
      //return new Uint8Array(response.arrayBuffer()); //to convert to UintArray8
      return response.arrayBuffer()
    })


    let buff = Buffer.from(responseArray)
    let output = JSON.parse(buff.toString());

    console.log("output", output);

    let lacle =
    {
      "type": "Buffer",
      "data": [
        215,
        145,
        156,
        250,
        250,
        127,
        27,
        85,
        51,
        12,
        130,
        21,
        53,
        238,
        22,
        40,
        40,
        136,
        146,
        252,
        181,
        179,
        19,
        25,
        196,
        181,
        227,
        170,
        6,
        48,
        145,
        236
      ]
    };

    let bytesView = new Uint8Array(lacle);

    let strk = new TextDecoder().decode(bytesView);

    // Decrypts output
    let decrypted = fr7decrypt(lacle, output);
    console.log("decrypted", decrypted);

    let blob = new Blob([decrypted], { type: 'application/octet-stream' });
    saveData(blob, "poly.png");

  }

  return (
    <>
      <Helmet>
        <title>ACE-ft | Home</title>
      </Helmet>
      <div className="relative flex mx-m py-m">
        <div className="flex">
          <SendForm />
          <StepBar />
        </div>

        <div className="text-iexwhite">
          {/* <button className="rounded-l-full rounded-r-full border border-iexwhite ml-8 px-4 py-2"
            onClick={(e) => {
              e.preventDefault();
              console.log(bgCreator)
              console.log(background.user)
            }}
          >
            Test bg creator
          </button> */}
          {/* <button className="rounded-l-full rounded-r-full border border-white ml-8 px-4 py-2"
            onClick={(e) => {
              e.preventDefault();
              console.log(bgUrls)
              console.log(bgUrls.full)
            }}
          >
            Test bg Urls
          </button> */}
        </div>
        <div className="absolute right-0 bottom-0 flex flex-col text-sm font-extralight px-8 mb-m">
          <div className="w-full relative flex-col justify-end">
            <div className="top-0">
              { darkMode && (
                <>
                  <h4>Credits</h4>
                  <p>{bgCreator.id}</p>
                  <p>{bgCreator.name}</p>
                  <p>{bgCreator.username}</p>
                  {bgCreatorSocial ? (
                    <p>Instagram : {bgCreatorSocial.instagram_username}</p>
                  ) : (
                    <div>
                    </div>
                  )}
                </>
              )}
            </div>
            
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;