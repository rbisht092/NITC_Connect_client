const PostCard = ({ title, description, author }) => {
    return (
      <div className="bg-gray-800 p-4 rounded shadow hover:bg-gray-700">
        <h3 className="text-xl font-bold mb-2 text-blue-400">{title}</h3>
        <p className="text-gray-300 mb-2">{description}</p>
        <p className="text-sm text-gray-500">By {author}</p>
      </div>
    );
  };
  
  export default PostCard;