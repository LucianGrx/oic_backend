import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import { AiOutlineMenu } from "react-icons/ai";
import { MdClose } from "react-icons/md";


const Header = () => {
  const { setAuthInfo, authInfo } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://oic-backend.onrender.com/profile", {
          credentials: "include",
        });
        const data = await response.json();
        setAuthInfo({ ...data, loading: false });
      } catch (err) {
        setAuthInfo({ loading: false });
      }
    }

    fetchData();
  }, [setAuthInfo]);
  
  function logout() {
    fetch(`${process.env.REACT_APP_API_URL}/logout`, {
      credentials: "include",
      method: "POST",
    });
    setAuthInfo(null);
  }

  const username = authInfo?.username;

  return (
    <header className="mt-20">
      
      <nav>
        {username && (
          <>
            <header className="fixed top-0 left-0 w-full z-10">
              <nav className="bg-white shadow-md">
                <div className="max-w-lg mx-auto px-4">
                  <div className="flex justify-between h-16">
                    <div className="flex items-center space-x-4">
                      <Link to="/" className="logo cursor-pointer">
                      <img
                        src="/logo-inno.png"
                        alt="Logo"
                        className="h-14"
                      />
                      </Link>
                      
                      <div className="hidden md:flex items-center space-x-10">
                        <a
                          href="/"
                          className="text-gray-800 hover:text-gray-600"
                        >
                          Home
                        </a>
                        <a
                          href="/about"
                          className="text-gray-800 hover:text-gray-600"
                        >
                          About
                        </a>
                        <a
                          href="/blog"
                          className="text-gray-800 hover:text-gray-600"
                        >
                          Blog
                        </a>
                        {!authInfo.loading && authInfo.isApproved && <Link to="/create">Create</Link>}
                        <button onClick={logout}>Logout</button>
                      </div>
                    </div>

                    <div className="md:hidden flex items-center">
                      <button
                        onClick={toggleMenu}
                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-600"
                      >
                        {isMenuOpen ? (
                          <MdClose className="block h-6 w-6" />
                        ) : (
                          <AiOutlineMenu className="block h-6 w-6" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {isMenuOpen && (
                  <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 ">
                      <a
                        href="/"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-gray-600 hover:bg-gray-100"
                      >
                        Home
                      </a>
                      <a
                        href="/about"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-gray-600 hover:bg-gray-100"
                      >
                        About
                      </a>
                      <a
                        href="/blog"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-gray-600 hover:bg-gray-100"
                      >
                        Blog
                      </a>
                      {!authInfo.loading && authInfo.isApproved && <Link className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-gray-600 hover:bg-gray-100" to="/create">Create</Link>}
                        <button className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-gray-600 hover:bg-gray-100" onClick={logout}>Logout</button>
                    </div>
                  </div>
                )}
              </nav>
            </header>
          </>
        )}
        {!username && (
          <>
            <header className="fixed top-0 left-0 w-full z-10">
              <nav className="bg-white shadow-md">
                <div className="max-w-lg mx-auto px-4">
                  <div className="flex justify-between h-16">
                    <div className="flex items-center space-x-4">
                    <Link to="/" className="logo cursor-pointer">
                      <img
                        src="/logo-inno.png"
                        alt="Logo"
                        className="h-14"
                      />
                      </Link>
                      <div className="hidden md:flex items-center space-x-10">
                        <a
                          href="/"
                          className="text-gray-800 hover:text-gray-600"
                        >
                          Home
                        </a>
                        <a
                          href="/about"
                          className="text-gray-800 hover:text-gray-600"
                        >
                          About
                        </a>
                        <a
                          href="/blog"
                          className="text-gray-800 hover:text-gray-600"
                        >
                          Blog
                        </a>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                      </div>
                    </div>

                    <div className="md:hidden flex items-center">
                      <button
                        onClick={toggleMenu}
                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-600"
                      >
                        {isMenuOpen ? (
                          <MdClose className="block h-6 w-6" />
                        ) : (
                          <AiOutlineMenu className="block h-6 w-6" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {isMenuOpen && (
                  <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 ">
                      <a
                        href="/"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-gray-600 hover:bg-gray-100"
                      >
                        Home
                      </a>
                      <a
                        href="/about"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-gray-600 hover:bg-gray-100"
                      >
                        About
                      </a>
                      <a
                        href="/blog"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-gray-600 hover:bg-gray-100"
                      >
                        Blog
                      </a>
                      <Link
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-gray-600 hover:bg-gray-100"
                        to="/login"
                      >
                        Login
                      </Link>
                      <Link
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-gray-600 hover:bg-gray-100"
                        to="/register"
                      >
                        Register
                      </Link>
                    </div>
                  </div>
                )}
              </nav>
            </header>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
