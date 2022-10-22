import React, {useContext} from 'react';
import NavBar from "./components/Navbar";
import SendForm from "./components/SendForm";
import { AceContext } from './context/context';


function App() {
  const { background, bgCreator, bgUrls, bgCreatorSocial, imgUrl, checkFileAvailability } = useContext(AceContext);

  return (
    <div className="min-h-screen bg-center bg-contain text-white" id="app"
      style={{
        backgroundImage: `url(${bgUrls.full})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="mx-auto">
        <NavBar />
        <main className="max-w-7xl mx-auto">
          <div className="mt-16 mx-8">
            <SendForm />
            <div className="text-white">
              <button className="rounded-l-full rounded-r-full border border-white mr-8 px-4 py-2"
                onClick={(e) => {
                  e.preventDefault();
                  console.log(background)
                }}
              >
                Test bg
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
              <button className="rounded-l-full rounded-r-full border border-white ml-8 px-4 py-2"
                onClick={(e) => {
                  e.preventDefault();
                  console.log(imgUrl)
                  const imggg = document.getElementById('imgipfs')
                  console.log(imggg)
                  imggg.src=imgUrl
                  console.log(imggg)
                }}
              >
                Test IMAGE IPFS
              </button>
              <button className="rounded-l-full rounded-r-full border border-white ml-8 px-4 py-2"
                onClick={async (e) => {
                  e.preventDefault();
                  const available = await checkFileAvailability()
                  console.log(available);
                }}
              >
                Test availability file
              </button>
              <div> <img src='' alt="IPFS Image" id='imgipfs'/></div>
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
        </main>
      </div>
    </div>
  );
}

export default App;
