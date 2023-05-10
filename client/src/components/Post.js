import React from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const Post = ({_id, title, summary, cover, content, createdAt, author }) => {
  return (
    <div className=" p-6">
      <div className="max-w-2xl mx-auto transform hover:scale-105 transition-transform duration-300">
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
          <Link to={`/post/${_id}`}>
            <img className="w-full h-64 object-cover object-center" src={"https://oic-backend.onrender.com/" + cover} alt="poza-blog" />
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-indigo-700/20 to-transparent"></div>
          </Link>
          <div className="p-6">
            <Link to={`/post/${_id}`}>
              <h2 className="text-2xl font-bold text-indigo-700 mb-2">{title}</h2>
            </Link>
            <div className="flex items-center text-gray-500 my-3">
              <a href="/" className="font-medium mr-3">{author.username}</a>
              <time>{format(new Date(createdAt), "MMM d, yyyy")}</time>
            </div>
            <p className="text-gray-700 leading-relaxed">{summary}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
