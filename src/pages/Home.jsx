import React, {useContext, useEffect} from 'react';
import SendForm from "../components/SendForm/SendForm";
import { AceContext } from '../context/context';
import {useState} from 'react';

function Home() {
  const { isLoading, setIsLoading, state, background, bgCreator, bgUrls, bgCreatorSocial, imgUrl, checkFileAvailability } = useContext(AceContext);

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


  return (
    <div className="flex flex-col mt-16 mx-8">
      <div className="flex">
        <SendForm />
        { isLoading ? (
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
          { bgCreatorSocial ? (
            <p>Instagram : {bgCreatorSocial.instagram_username}</p>
          ) : (
            <div></div>
          )}
          
      </div>
    </div> 
  )
}

export default Home;