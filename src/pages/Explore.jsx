import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Explore = ({setModalOpen}) => {
  const [communities, setCommunities] = useState([]);
  const [myjoined, setMyJoined] = useState([]);
  const navigate = useNavigate()
  const getJoined = async () => {
    try{
    const joined = await axios.get("/join", {
      headers: { token: localStorage.getItem("token") },
    });
    const myComs = joined.data.communities.map((com) => com.communityId._id);
    setMyJoined(myComs);
  }
  catch(err){
    if(err.response.status=404)
      setMyJoined([])
  }
  };
  const fetchCommunities = async () => {
    try {
      const response = await axios.get("/communities");
      if (response.status == 200) {
        const newCommunity = response.data.map((com) => ({
          id: com._id,
          name: com.name,
          description: com.description,
        }));
        // console.log(joined.data.communities)
        setCommunities(newCommunity);
      }
    } catch (err) {
    }
  };
  useEffect(() => {
    fetchCommunities();
    getJoined();
  }, []);

  const handleJoinCommunity = async (com_id) => {
    console.log(com_id);
    
    try {
      const response = await axios.post(
        `/join/${com_id}/join`,
        {},
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      getJoined();
    } catch (err) {
      console.log(err.response);
      alert("please login to enable the function")
      setModalOpen(true)
    }
  };

  const handleLeave = async (com_id) => {
    try {
      const response = await axios.delete(`join/${com_id}/leave`, {
        headers: { token: localStorage.getItem("token") },
      });
      getJoined();
    } catch (err) {
      console.log(err.response.status==404);
    }
  };
  console.log(myjoined)
  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-400 mb-6">
        Explore Communities
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {communities?.length ? communities.map((community) => (
          <div
            key={community.id}
            className="bg-gray-800 p-4 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-bold text-blue-400 hover:cursor-pointer hover:underline" onClick={()=> navigate(`/community/${community.id}/${community.name}`)}>
              {community.name}
            </h2>

            <p className="text-gray-300 mt-2">
              {community.description.substring(0, 30)}...
            </p>
            {console.log(
              "userid",
              localStorage.getItem("user_id"),
              myjoined.includes(community.id)
            )}
            {myjoined.includes(community.id) ? (
              <button
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-blue-500 transition duration-200"
                onClick={() => handleLeave(community.id)}
              >
                Leave
              </button>
            ) : (
              <button
                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 transition duration-200"
                onClick={() => handleJoinCommunity(community.id)}
              >
                Join
              </button>
            )}
          </div>
        )): <>
        <Link to="/create-community">Be the first to Create a community</Link></>}
      </div>
    </div>
  );
};

export default Explore;
