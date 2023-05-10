import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import "./App.css";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { UserContextProvider } from "./components/UserContext";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import Blog from "./pages/Blog";
import Home from "./pages/HomePage/Home";
import EditPost from "./pages/EditPost";
import About from "./pages/About";

function getAuthInfoFromCookie() {
  const token = Cookies.get("token");

  if (!token) {
    return null;
  }

  const decodedToken = jwt_decode(token);

  return {
    id: decodedToken.id,
    username: decodedToken.username
  };
}

function App() {
  const [authInfo, setAuthInfo] = useState(null);

  useEffect(() => {
    const authInfoFromCookie = getAuthInfoFromCookie();
    if (authInfoFromCookie) {
      setAuthInfo(authInfoFromCookie);
    }
  }, []);


  return (
    <UserContextProvider value={{ authInfo, setAuthInfo }}>
      <Routes>
        <Route path={"/"} element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={"/blog"} element={<Blog />} />
          <Route path={"/about"} element={<About />} />
          <Route path={"/login"} element={<LoginPage />} />
          <Route path={"/register"} element={<RegisterPage />} />
          <Route path={"/create"} element={<CreatePost />} />
          <Route path={"/post/:id"} element={<PostPage />} />
          <Route path={"/edit/:id"} element={<EditPost />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;