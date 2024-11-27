import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateCommunity = ({setModalOpen}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        name,
        description,
      };

      const token = localStorage.getItem('token');
      const response = await axios.post('/communities', data, {
        headers: {
          token: token,
          'Content-Type': 'application/json',
        },
      });

      console.log('Community created successfully:', response.data);
      navigate(`/community/${response.data.community._id}/${response.data.community.name}`)
    } catch (error) {
      console.error('Error creating community:', error);
      alert("please login to enable the function")
      setModalOpen(true)
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-blue-400 mb-4">Create a New Community</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-300">Community Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 bg-gray-700 text-gray-300 border border-gray-600 rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-gray-300">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 bg-gray-700 text-gray-300 border border-gray-600 rounded"
            rows="6"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 transition duration-200"
        >
          Create Community
        </button>
      </form>
    </div>
  );
};

export default CreateCommunity;