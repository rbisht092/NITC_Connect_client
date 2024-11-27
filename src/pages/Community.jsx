import React, { useState, useEffect } from 'react';
import { useNavigate, useParams,Link } from 'react-router-dom';
import axios from 'axios';

const Community = () => {
  const { id,name } = useParams();
  console.log(id,name)
  const [post, setPosts] = useState([]);
  const navigate = useNavigate()
  const fetchComPosts = async () => {
    try {
      const response = await axios.get(`/post/communities/${id}`);
      // console.log(response.data)
      
      if (response.status === 200) {
        console.log(response.data.posts)
        setPosts(response.data.posts)
        
      }
    } catch (error) {
      console.error('Error fetching user posts:', error);
    }
  };

  useEffect(() => {
    fetchComPosts()
  }, [id]);

  
  const handleDelete = async (id)=>{
    try{
      const response = await axios.delete( `/communities/${id}`, {headers: {token: localStorage.getItem("token")}})
      if(response.status=200){
        fetchComPosts()
      }
    }catch(err){
      console.log(err.response)
      fetchComPosts()
    }
  }
  return (
    <div>
     <div className='flex justify-between'>
    <h1 className="text-3xl font-bold text-blue-400 mb-6">{name} </h1>  <h2 className='hover:cursor-pointer hover:shadow-lg hover:text-lg' onClick={()=>handleDelete(id)}>❌</h2></div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {post?.length ? post.map((post) => (
        <div key={post.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
          <div className="text-l font-bold text-beige-300 hover:cursor-pointer hover:underline">{post.author.displayname}</div>
         
           <h2 onClick={()=> navigate(`/post/${post._id}`)} className="text-lg font-bold text-blue-400 hover:underline hover:cursor-pointer">{post.title}
            </h2>
          
            
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
      )) : <>"Posts empty"
      <Link to="/create-post">Be the first to create a post</Link></>}
    </div>
  </div>
  );
};

export default Community;