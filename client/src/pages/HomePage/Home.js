import React, { useState, useEffect } from "react";
import Slider from "../../components/Slider";
import FirstSection from "./FirstSection";
import SecondSection from "./SecondSection";
import Testimonials from "./Testimonials";
import Post from "../../components/Post";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/post?limit=3`)
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);
  return (
    <div className="bg-white">
      <Slider />
      <FirstSection />
      <SecondSection />
      <Testimonials />
      <div>
        {posts.map((post) => (
          <Post key={post._id} {...post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
