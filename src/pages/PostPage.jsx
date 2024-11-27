import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PostPage = ({ setModalOpen }) => {
  const { id } = useParams();
  const [newComment, setNewComment] = useState("");
  const [post, setPost] = useState([]);
  const [like, setLike] = useState({});

  const handleLike = async () => {
    try {
      const response = await axios.post(
        `/post/${id}/reactions`,
        { reaction: "like" },
        { headers: { token: localStorage.getItem("token") } }
      );
      if (response.status == 200) {
        setLike(response.data);
      }
    } catch (err) {
      alert("please login to enable the function");
      setModalOpen(true);
    }
  };

  const handleDislike = async () => {
    try {
      const response = await axios.post(
        `/post/${id}/reactions`,
        { reaction: "dislike" },
        { headers: { token: localStorage.getItem("token") } }
      );
      if (response.status == 200) {
        setLike(response.data);
      }
    } catch (err) {
      alert(err.response.data);
      alert("please login to enable the function");
      setModalOpen(true);
    }
  };

  const getPost = async () => {
    try {
      const response = await axios.get(`/post/${id}`);
      console.log(response.data.post);
      if (response.status == 200) {
        const post = {
          comments: response.data.post.comments,
          content: response.data.post.content,
          title: response.data.post.title,
          likes: response.data.post.reactions.likes,
          dislikes: response.data.post.reactions.dislikes,
          author: response.data.post.author.displayname,
          authorimg: response.data.post.author.image,
          authoruser: response.data.post.author.username,
          media: response.data.post.media[0],
        };
        setPost(post);
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `/post/${id}/comments`,
        { text: newComment },
        { headers: { token: localStorage.getItem("token") } }
      );
      console.log(response.data);
      if (response.status == 201) {
        setLike(response);
        getPost();
      }
    } catch (err) {
      alert("please login to enable the function");
      setModalOpen(true);
    } finally {
      setNewComment("");
    }
  };

  useEffect(() => {
    getPost();
  }, [like]);

  return (
    <div className="flex justify-center px-4">
      {/* Post Section */}
      <div className="max-w-2xl bg-gray-800 p-6 rounded-lg shadow-md mr-8 flex-grow">
        <h1 className="text-3xl font-bold text-blue-400 mb-6 text-center">
          Post: {post.title}
        </h1>
        {/* <p className="text-green-700 font-bold text-lg mb-4 underline">
          {post.author}
        </p> */}

        {/* Media Section */}
        {post.media ? (
          <div className="mb-6">
            <img
              src={post.media}
              alt="Post Media"
              className="w-full max-h-96 rounded-lg object-contain"
            />
          </div>
        ) : null}

        {/* Post Content */}
        <p className="text-gray-300 mb-4">{post.content}</p>

        <div className="flex items-center space-x-4 mb-6">
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500"
            onClick={handleLike}
          >
            👍 {post.likes}
          </button>
          <button
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-500"
            onClick={handleDislike}
          >
            👎 {post.dislikes}
          </button>
        </div>

        <div>
          <form onSubmit={handleCommentSubmit} className="mt-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="w-full p-2 bg-gray-700 text-gray-300 border border-gray-600 rounded mb-4"
              rows="3"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500"
            >
              Add Comment
            </button>
          </form>

          <h2 className="text-2xl font-bold text-blue-400 mb-4 mt-7">
            Comments
          </h2>
          {post.comments?.map((comment, index) => (
            <ul className="space-y-4" key={index}>
              <li className="bg-gray-700 p-4 rounded">
                <div className="font-bold text-blue-400 underline">
                  {comment.user.username}
                </div>
                {comment.text}
              </li>
            </ul>
          ))}
        </div>
      </div>

      {/* Author Section */}
      <aside className="w-64 h-80 bg-gray-800 p-6 rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-gray-700">
            <img
              src={post.authorimg || "/default-profile.png"}
              alt="Author"
              className="object-cover w-full h-full"
            />
          </div>
          <h2 className="text-xl font-bold text-blue-400">{post.author}</h2>
          <h3 className="text-l text-beige-400">@{post.authoruser}</h3>
          <p className="text-gray-300 mt-2 text-center text-sm">
            Author of this post. Learn more about their contributions.
          </p>
        </div>
      </aside>
    </div>
  );
};

export default PostPage;
