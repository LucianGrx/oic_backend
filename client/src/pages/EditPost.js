import React, { useEffect, useState, useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate, useParams } from "react-router-dom";
import { UserContext } from "../components/UserContext";

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  const { authInfo } = useContext(UserContext);

  useEffect(() => {
    fetch(`https://oic-backend.onrender.com/post/` + id).then((response) => {
      response.json().then((postInfo) => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
      });
    });
  }, [id]);

  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }
    const response = await fetch("https://oic-backend.onrender.com/post", {
      method: "PUT",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (!authInfo || !authInfo.isApproved) {
    return <Navigate to="/" />;
  }

  if (redirect) {
    return <Navigate to={"/post/" + id} />;
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create New Post
        </h2>
        <form className="mt-8 space-y-6" onSubmit={updatePost}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="title" className="sr-only">
                Title
              </label>
              <input
                id="title"
                type="text"
                placeholder="Title"
                value={title}
                onChange={(ev) => setTitle(ev.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="summary" className="sr-only">
                Summary
              </label>
              <input
                id="summary"
                type="text"
                placeholder="Summary"
                value={summary}
                onChange={(ev) => setSummary(ev.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Upload Image
            </label>
            <input
              type="file"
              onChange={(ev) => setFiles(ev.target.files)}
              className="mt-2 text-sm text-gray-600"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <ReactQuill
              value={content}
              onChange={setContent}
              className="mt-1"
            />
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
