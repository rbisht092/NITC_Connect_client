import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import defaultProfile from '../assets/defaultProfile.jpeg';

const Sidebar = () => {
  const [profileImg, setProfileImg] = useState(defaultProfile);

  const updateProfileImage = () => {
    const storedProfileUrl = localStorage.getItem('profile_url');
    if(storedProfileUrl){
    setProfileImg(storedProfileUrl)
        }
        else{
          setProfileImg(null)
        }}

  useEffect(() => {
    // Update the profile image on mount
    updateProfileImage();

    // Listen for changes in localStorage
    const handleStorageChange = () => {
      updateProfileImage();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <aside className="w-64 bg-gray-800 h-screen p-4 shadow-lg rounded-lg">
      <div className="flex flex-col items-center mb-6">
        <Link to="/user">
          <div className="w-24 h-24 rounded-full border-4 border-gray-700 bg-cover">
            <img
              src={profileImg ? profileImg : defaultProfile}
              alt="Profile"
              className="h-full w-full rounded-full object-cover"
            />
          </div>
        </Link>
        <h2 className="text-xl font-bold text-blue-400 mt-4">Welcome</h2>
        <h2 className="text-l font-bold text-white mt-4">
          {localStorage.getItem('displayname') || 'Guest'}
        </h2>
      </div>
      <ul className="space-y-4">
        <li>
          <Link to="/" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 rounded-lg px-2 py-1">Dashboard</Link>
        </li>
        <li>
          <Link to="/explore" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 rounded-lg px-2 py-1">Explore</Link>
        </li>
        <li>
          <Link to="/about" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 rounded-lg px-2 py-1">About</Link>
        </li>
        <li>
          <Link to="/contact" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 rounded-lg px-2 py-1">Contact</Link>
        </li>
        <li>
          <Link to="/create-post" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 rounded-lg px-2 py-1">Create Post</Link>
        </li>
        <li>
          <Link to="/create-community" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 rounded-lg px-2 py-1">Create Community</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
