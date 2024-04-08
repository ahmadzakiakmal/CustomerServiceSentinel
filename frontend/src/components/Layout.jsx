import React from "react";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <div className="h-screen flex flex-row justify-start text-dark-brown">
      <Sidebar />
      <div className="bg-white flex-1 text-dark-brown">{children}</div>
    </div>
  );
}
export default Layout;
