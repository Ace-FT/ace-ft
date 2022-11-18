import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import Home from "./pages/Home";
import Inbox from "./pages/Inbox";
import SentItems from "./pages/SentItems/SentItems";
import Settings from "./pages/Settings";
import { AceContext } from "./context/context";
import useRequest from "./hooks/useRequest";
import PersonnalData from "./pages/Settings/PersonnalData";
import Params from "./pages/Settings/Params";
import Protected from "./pages/Protected";
//import {queryForMyInbox} from './shared/queries';

function App() {
  const { connectedAccount, background, bgCreator, bgUrls } =
    useContext(AceContext);

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);
  const isConnected = connectedAccount !== "";

  return (
    <div
      className="min-h-screen bg-center bg-contain text-white"
      id="app"
      style={{
        backgroundImage: `url(${bgUrls.full})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="mx-auto">
        <main className="max-w-7xl mx-auto">
          <Router>
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/inbox" element={
                  <Protected isLoggedIn={isConnected}>
                    <Inbox />
                  </Protected>
                }
              />
              <Route path="/sent" element={
                  <Protected isLoggedIn={isConnected}>
                    <SentItems />
                  </Protected>
                }
              />
              <Route path="/settings" element={
                  <Protected isLoggedIn={isConnected}>
                    <Settings />
                  </Protected>
                }
              >
                <Route index element={<PersonnalData />} />
                <Route path="personnal-data" element={<PersonnalData />} />
                <Route path="params" element={<Params />} />
              </Route>
            </Routes>
          </Router>
        </main>
      </div>
    </div>
  );
}

export default App;
