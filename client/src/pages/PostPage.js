import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { UserContext } from "../components/UserContext";
import { Link } from "react-router-dom";

const PostPage = () => {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  useEffect(() => {
    fetch(`https://oic-backend.onrender.com/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
  }, [id]);

  if (!postInfo) return "";

  return (
    <div className="min-h-screen bg-gray-100 py-12 flex flex-col justify-center">
      <div className="relative w-full max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            className="w-full h-96 object-cover object-center"
            src={`https://oic-backend.onrender.com/${postInfo.cover}`}
            alt=""
          />
          <div className="p-8 md:p-12">
            <h1 className="text-4xl font-bold text-indigo-700">
              {postInfo.title}
            </h1>
            <p className="py-3 text-gray-500">{postInfo.author.username}</p>
            {userInfo && userInfo.id === postInfo.author._id && (
              <div className="text-center">
                <Link className=" bg-gray-700 text-white p-4 rounded-md" to={`/edit/${postInfo._id}`}>Edit this post</Link>
              </div>
            )}
            <time className="block text-sm text-gray-500 mb-5">
              {format(new Date(postInfo.createdAt), "MMM d, yyyy")}
            </time>
            <div
              className="content text-gray-800 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: postInfo.content }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
