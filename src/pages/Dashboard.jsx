import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Community from "./Community";
import { comment } from "postcss";

const Dashboard = () => {
  // const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [mycoms, setMycoms] = useState([]);
  const navigate = useNavigate();
  // const getMycom = async()=>{
  //   try{
  //     const response = await axios.get("/communities");
  //     if (response.status == 200) {
  //       const newCommunity = response.data.map((com) => ({
  //         id: com._id,
  //         name: com.name,
  //         description: com.description,
  //       }));
  //       // console.log(joined.data.communities)
  //       setCommunities(newCommunity);
  //     }
  //   } catch (err) {
  //   }
  // }
  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `/post/followed-posts/${localStorage.getItem("user_id")}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      if (response.status === 200) {
        // setPosts(response.data);
        console.log(response.data.posts);
        const posts = response.data.posts.map((post) => ({
          post_id: post._id,
          title: post.title,
          content: post.content,
          likes: post.reactions.likes,
          dislikes: post.reactions.dislikes,
          community: post.community.name,
          com_id: post.community._id,
          comment: post.comments,
          timeStamp: post.updatedAt,
        }));
        posts.sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp));
        setUserPosts(posts);
      }
    } catch (error) {
      console.error("Error fetching posts:", error.response);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-400 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userPosts?.length ? (
          userPosts.map((post) => (
            <div
              key={post.post_id}
              className="bg-gray-800 p-4 rounded-lg shadow-md"
            >
              {console.log(post.post_id)}

              <h3
                className="text-l font-bold text-beige-300 hover:cursor-pointer hover:underline"
                onClick={() => navigate(`/community/${post.com_id}/${post.community}`)}
              >
                {post.community}
              </h3>
              <h2
                className="text-xl font-bold text-blue-400 hover:cursor-pointer hover:underline"
                onClick={() => navigate(`/post/${post.post_id}`)}
              >
                {post.title}
              </h2>
              <p className="text-gray-300 mt-2">{post.content.substring(0,30)}...</p>
              <div className="flex justify-between items-center mt-4 text-gray-400">
                <div className="flex items-center">
                  <span className="mr-2">👍 {post.likes}</span>
                  <span>👎 {post.dislikes}</span>
                </div>
                <div>💬 {post.comment.length} Comments</div>
              </div>
            </div>
          ))
        ) : (
          <div  className="">
            <div  className="" >Join a community to get started</div>
            <div>
              <Link
                to="/explore"
                className="text-xl font-bold text-blue-400 hover:cursor-pointer hover:underline"
              >
                Explore communties
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
