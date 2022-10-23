import React, {useContext} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NavBar from "./components/Navbar";
import SendForm from "./components/SendForm";
import Home from "./pages/Home"
import Inbox from "./pages/Inbox";
import SentItems from "./pages/SentItems";
import Settings from "./pages/Settings";
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
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/inbox" element={ <Inbox /> } />
            <Route path="/sent" element={ <SentItems />} />
            <Route path="/settings" element={ <Settings /> } />
          </Routes>
        </Router>

      </div>
    </div>
  );
}

export default App;
