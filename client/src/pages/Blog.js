import React, { useEffect, useState } from "react";
import Post from "../components/Post";

const Blog = () => {
    const [posts, setPosts] = useState('');

    useEffect(() => {
      fetch("https://oic-backend.onrender.com/post").then((response) => {
        response.json().then((posts) => {
          setPosts(posts);
        });
      });
    }, []);
    return (
      <>
        {posts.length > 0 && posts.map((post, index) => (
          <Post key={index} {...post}/>
        ))}
      </>
    );
  };

export default Blog