import React, {useContext, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NavBar from "./components/Navbar";
import SendForm from "./components/SendForm/SendForm";
import Home from "./pages/Home"
import Inbox from "./pages/Inbox";
import SentItems from "./pages/SentItems";
import Settings from "./pages/Settings";
import { AceContext } from './context/context';


function App() {
  const { background, bgCreator, bgUrls } = useContext(AceContext);

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
        <main className="max-w-7xl mx-auto">
          <Router>
            <NavBar />
            <Routes>
              <Route path="/" element={ <Home /> } />
              <Route path="/inbox" element={ <Inbox /> } />
              <Route path="/sent" element={ <SentItems />} />
              <Route path="/settings" element={ <Settings /> } />
            </Routes>
          </Router>
        </main>
      </div>
    </div>
  );
}

export default App;
