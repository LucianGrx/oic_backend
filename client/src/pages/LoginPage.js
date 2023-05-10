import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../components/UserContext";
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setAuthInfo } = useContext(UserContext);
  
  const login = async (ev) => {
    ev.preventDefault();
   const response = await fetch("https://oic-backend.onrender.com/login", {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type':'application/json'},
      credentials: 'include',
    })
    if (response.ok) {
      const token = Cookies.get("token");
      const decodedToken = jwt_decode(token);
      const authInfoFromToken = {
        id: decodedToken.id,
        username: decodedToken.username
      };
      setAuthInfo(authInfoFromToken);
      setRedirect(true);
    }else{
      alert('wrong credentials');
    }
  }


  if(redirect){
    return <Navigate to={'/'} />
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={login}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(ev) => setUsername(ev.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
          </div>
  
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
