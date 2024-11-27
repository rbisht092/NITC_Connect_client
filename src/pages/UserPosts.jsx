import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Community from './Community';
import { useNavigate } from 'react-router-dom';

const UserPosts = () => {
  const [userPosts, setUserPosts] = useState([{
    id:"",
    content:"",
    title: "",
    likes: "",
    dislikes: "",
    comments: "",
    Community: ""
  }
  ]);
  const navigate = useNavigate()
  const fetchUserPosts = async () => {
    try {
      const response = await axios.get(`/post/users/${localStorage.getItem("user_id")}`);
      if (response.status === 200) {
        const posts = response.data.posts.map((post)=>({id:post._id,
          content:post.content,
          title: post.title,
          likes: post.reactions.likes,
          dislikes: post.reactions.dislikes,
          comments: post.comments,
        community: post.community.name,
      com_id: post.community._id}))
        setUserPosts(posts);
      }
    } catch (error) {
      console.error('Error fetching user posts:', error.response);
      setUserPosts([])
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, []);

  const handleDelete = async (id)=>{
    try{
      const response = await axios.delete( `/post/${id}`, {headers: {token: localStorage.getItem("token")}})
      if(response.status=200){
        fetchUserPosts()
      }
    }catch(err){
      console.log(err.response)

    }
  }
  // console.log(userPosts)
  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-400 mb-6">My Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userPosts?.length ? userPosts.map((post) => (
          <div key={post.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
            <div onClick={()=> navigate(`/community/${post.com_id}/${post.community}`)} className="text-l font-bold text-beige-300 hover:cursor-pointer hover:underline">{post.community}</div>
            <div className='flex justify-between' >
             <h2 onClick={()=> navigate(`/post/${post.id}`)} className="text-lg  space-x-2 font-bold text-blue-400 hover:underline hover:cursor-pointer">{post.title} </h2> 
             <h2 className='hover:cursor-pointer hover:shadow-lg hover:text-lg' onClick={()=>handleDelete(post.id)}>❌</h2>
              </div>
             
            {/* <p className="text-gray-300 mt-2">{post.}</p> */}
            <p className="text-gray-300 mt-2">{post.content.substring(0,30)}...</p>
            <div className="flex justify-between items-center mt-4 text-gray-400">
              <div className="flex items-center">
                <span className="mr-2">👍 {post.likes}</span>
                <span>👎 {post.dislikes}</span>
              </div>
              <div>
                💬 {post.comments.length} Comments
              </div>
            </div>
          </div>
        )) : "Posts empty"}
      </div>
    </div>
  );
};

export default UserPosts;