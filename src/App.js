import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import Home from "./pages/Home";
import Inbox from "./pages/Inbox";
import SentItems from "./pages/SentItems";
import Settings from "./pages/Settings";
import { AceContext } from "./context/context";
import Protected from "./pages/Protected";
import Footer from "./components/Footer";
import Modal from "./components/Modal/Modal" ;
import {toggleModal} from "./components/Modal/ModalController" ;
import { initWeb3auth } from "./shared/web3AuthLogin";

function App() {
  const { connectedAccount, connectWallet, bgUrls, creativeMode } = useContext(AceContext);
  const { ethereum } = window;

  document.onkeydown = function (evt) {
    evt = evt || window.event
    var isEscape = false
    if ("key" in evt) {
      isEscape = (evt.key === "Escape" || evt.key === "Esc")
    } else {
      isEscape = (evt.keyCode === 27)
    }

    if (isEscape && document.body.classList.contains('modal-active')) {
      toggleModal.call() ; 
    }
  };

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (sessionStorage?.getItem("isWalletConnected") === "true") {
        try {
          await connectWallet();
        } catch (ex) {
          console.log(ex);
        }
      }
    };
    connectWalletOnPageLoad();
  }, []);

  useEffect(() => {
    // const app = document.getElementById("app").style;
    // const backgroundImage = app.backgroundImage;
    // app.backgroundImage = "";
    // app.backgroundColor = "#ffffff";
    // console.log(backgroundImage)
    console.log(creativeMode);
  }, [creativeMode]);

  useEffect(() => {
    refreshOnWalletChange()
  }, [])

  useEffect(() => {
    initWeb3auth()
  }, [])

  const isConnected = connectedAccount !== "";

  const refreshOnWalletChange = () => {
    if (ethereum) {
      ethereum.on('accountsChanged', function () {
        window.location.reload()
      })
    }
  }

  return (
    <div
      className="min-h-screen bg-contain bg-center text-iexwhite"
      id="app"
      style={{
        backgroundImage: creativeMode ? `url(${bgUrls.full})` : "",
        backgroundColor: creativeMode ? "" : "#0d0d12",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Modal id="app-modal" />
      <Router>
        <NavBar />
        <div className="w-full">
          <div className="page-container">
            <main className="w-full text-iexwhite">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/inbox"
                  element={
                    <Protected isLoggedIn={isConnected}>
                      <Inbox />
                    </Protected>
                  }
                />
                <Route
                  path="/sent"
                  element={
                    <Protected isLoggedIn={isConnected}>
                      <SentItems />
                    </Protected>
                  }
                />
                <Route
                  path="/info"
                  element={
                    <Protected isLoggedIn={isConnected}>
                      <Settings />
                    </Protected>
                  }
                />
              </Routes>
            </main>
          </div>

        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;