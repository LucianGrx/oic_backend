import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Newsletter from "./Newsletter";


const Layout = () => {
  return (
    <main>
      <Header />
      <Outlet />
      <Newsletter />
      <Footer />
    </main>
  );
};

export default Layout;
