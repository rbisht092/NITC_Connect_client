import React from 'react';
import PostCard from '../components/PostCard';

const Home = () => {
  const posts = [
    { title: 'Post 1', description: 'Description of post 1', author: 'Author 1' },
    { title: 'Post 2', description: 'Description of post 2', author: 'Author 2' },
    { title: 'Post 3', description: 'Description of post 3', author: 'Author 3' },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-blue-400">Welcome to the Institute Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post, index) => (
          <PostCard
            key={index}
            title={post.title}
            description={post.description}
            author={post.author}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;