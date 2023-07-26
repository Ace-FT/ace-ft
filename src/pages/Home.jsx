import React, { useState, useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import SendForm from "../components/SendForm/SendForm";
import { AceContext } from '../context/context';
import crypto from 'crypto-browserify';
import StepBar from '../components/StepBar';
const APP_NAME = process.env.REACT_APP_NAME;

function Home() {
  const { state, background, bgCreator, bgUrls, bgCreatorSocial, creativeMode, backgroundIsLight } = useContext(AceContext);

  

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


  function getCreditClassName()
  {
    if (!creativeMode) return "credits-darkbg" ;

    if ( backgroundIsLight ) return "credits-lightbg"; 
    
    return "credits-darkbg"; 
  }


  return (
    <>
      <Helmet>
        <title>{APP_NAME} | Home</title>
      </Helmet>
      <div className="relative flex mx-m py-m">
        <div className="flex">
          <SendForm />
          <StepBar />
        </div>
          <div className="credits-container">
            { creativeMode && (
              <>
                <h4 className={getCreditClassName()}><u>Credits</u></h4>
              
                {bgCreator && bgCreator.links ? (
                    <><p className={getCreditClassName()}>Author: <a className={getCreditClassName()} href={bgCreator.links.html} target="_blank">{bgCreator.name} ({bgCreator.username})</a></p>
                    <p className={getCreditClassName()}>ImageId:  <a className={getCreditClassName()} href={background.links.html} target="_blank">{background.id}</a></p></>
                  ) : (<p></p>)}

                <p className={getCreditClassName()}>Source: Unsplash</p>
                {bgCreatorSocial && bgCreatorSocial.instagram_username && bgCreatorSocial.instagram_username.length > 0 ? (
                  <p className={getCreditClassName()}>Instagram : <a className={getCreditClassName()} href={"https://instagram.com/" + bgCreatorSocial.instagram_username} target="_blank">{bgCreatorSocial.instagram_username}</a></p>
                ) : (
                  <div>
                  </div>
                )}
              </>
            )}
          </div>
      </div>
    </>
  )
}

export default Home;