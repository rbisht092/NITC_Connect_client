import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePost = ({setModalOpen}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
    const[community,setCommunity]=useState()
    const[communities,setCommunities] =useState([])
  const navigate = useNavigate()
useEffect(() => {
    const fetchCommunities = async () => {
      try{
        const joined = await axios.get("/join", {
          headers: { token: localStorage.getItem("token") },
        });
        const myComs = joined.data.communities.map((com) => com.communityId.name);
        console.log(myComs)
        setCommunities(myComs);
      }
      catch(err){console.log(err)}
    };

    fetchCommunities();
  }, []);

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const token = localStorage.getItem('token');
      const response = await axios.post('/post', {title, content, community, media:[image]}, {
        headers: {
          token: token
        },
        },
      );
      console.log(response)


      navigate(`/post/${response.data.post._id}`)
    } catch (error) {
      console.error('Error creating post:', error);
      alert("please login to enable the function")
      setModalOpen(true)
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-blue-400 mb-4">Create a New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-gray-300">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 bg-gray-700 text-gray-300 border border-gray-600 rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="community" className="block text-gray-300">Community</label>
          <select
            id="community"
            value={community}
            onChange={(e) => setCommunity(e.target.value)}
            className="w-full p-2 bg-gray-700 text-gray-300 border border-gray-600 rounded"
            required
          >
            <option value="">Select Community</option>
            {communities?.map((comm) => (
              <option key={comm} value={comm.id}>{comm}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="content" className="block text-gray-300">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 bg-gray-700 text-gray-300 border border-gray-600 rounded"
            rows="6"
            required
          ></textarea>
        </div>

        <div>
          <label htmlFor="image" className="block text-gray-300">Link to Image</label>
          <textarea
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full p-2 bg-gray-700 text-gray-300 border border-gray-600 rounded"
            rows="1"
            required
          ></textarea>
        </div>

        <div>
          <label htmlFor="image" className="block text-gray-300">Image (Optional)</label>
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full text-gray-300"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 transition duration-200"
        >
          Submit Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;