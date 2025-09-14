import { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import { Route, Routes, useLocation } from "react-router-dom";
import Chatbox from "./components/Chatbox";
import Credits from "./pages/Credits";
import Community from "./pages/Community";
import Loading from "./pages/Loading";
import { useAppContext } from "./context/AppContext";
import Login from "./pages/Login";
import {Toaster} from 'react-hot-toast';

function App() {

  const {user, loadingUser} = useAppContext();

  // const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { pathname} = useLocation();

  if(pathname === "/loading" || loadingUser) {
    return <Loading />;
  }


  return (
    <>
    <Toaster />
    {/* {isMenuOpen && <img src="./images/close.png" className="absolute top-5 right-5 w-8 h-8 cursor-pointer md:hidden invert dark:invert-0" onClick={() => setIsMenuOpen(true)} />} */}
      

      {user ? (
        <div className="dark:bg-gradient-to-b from-[#242124] to-[#000000] dark:text-white">
        <div className="flex h-screen w-screen">
          {/* <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} /> */}
          <Sidebar />
          <Routes>
            <Route path="/" element={<Chatbox />} />
            <Route path="/credits" element={<Credits />} />
            <Route path="/community" element={<Community />} />
          </Routes>
        </div>
      </div>
      ) : (
        <div className="flex items-center justify-center h-screen w-screen bg-gradient-to-b from-[#242124] to-[#000000] text-white">
          <Login />
        </div>
      )}
      
    </>
  );
}

export default App;
