import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

import Navbar from './components/Navbar';
import Modal from './components/Modal';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Explore from './pages/Explore';
import PostPage from './pages/PostPage';
import CreatePost from './pages/CreatePost';
import CreateCommunity from './pages/CreateCommunity';
import axios from 'axios';
import UserPosts from './pages/UserPosts';
import Community from './pages/Community';

axios.defaults.baseURL = "http://localhost:5000"
const App = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false);

  // setIsLoggedin(localStorage.getItem("token"))
  useEffect(()=>{
    if(localStorage.getItem("token")){
      setIsLoggedin(true)
    }
  },[])
  return (
    <Router>
      <div className="bg-gray-900 text-gray-200 min-h-screen flex flex-col">
        <Navbar onLoginClick={() => setModalOpen(true)} isLoggedin={isLoggedin} setIsLoggedin={setIsLoggedin}/>
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex-1 p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/explore" element={<Explore setModalOpen={setModalOpen}/>} />
              <Route path="/post/:id" element={<PostPage setModalOpen={setModalOpen}/>} />
              <Route path="/create-post" element={<CreatePost setModalOpen={setModalOpen}/>} />
              <Route path="/create-community" element={<CreateCommunity setModalOpen={setModalOpen}/>} />
              <Route path="/user" element={<UserPosts />} />
              <Route path="/community/:id/:name" element={<Community setModalOpen={setModalOpen}/>} />
              
            </Routes>
          </div>
        </div>
        {isModalOpen && <Modal onClose={() => setModalOpen(false)}  setIsLoggedin = {setIsLoggedin} isRegistering= {isRegistering} setIsRegistering={setIsRegistering}/>}
      </div>
    </Router>
  );
};

export default App;
