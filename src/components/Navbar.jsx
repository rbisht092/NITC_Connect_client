import React from "react";
import logo from "../assets/NITC_logo.png";
const Navbar = ({ onLoginClick, isLoggedin, setIsLoggedin }) => {
    if(!localStorage.getItem("token")){
        setIsLoggedin(false)
    }
    const handleLogout = () =>{
        localStorage.clear()
        setIsLoggedin(false)
        window.location.reload();
    }
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 shadow-lg border-b border-gray-700 rounded-b-lg">
      <div className="flex items-center">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFAsn30IKIoc-hoD5MMIsEFYwSXEOokNXZwLhgmHT7LBAlpOIggA8qDLga8Zzv2NZLV7A&usqp=CAU" alt="NITC Logo" className="w-10 h-10 mr-3 rounded-full" />
        <h1 className="text-2xl font-bold text-blue-400">NITC Connect</h1>
      </div>
      {isLoggedin ? (
        <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition duration-200" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition duration-200"
          onClick={onLoginClick}
        >
          Login
        </button>
      )}
    </nav>
  );
};

export default Navbar;
