import React from "react";
import Sidebar from "./Sidebar";

function Layout({ Children }) {
  return (
    <div className="h-screen flex flex-row justify-start text-dark-brown">
      <Sidebar />
      <div className="bg-white-bg flex-1 p-4 text-dark-brown">{Children}</div>
    </div>
  );
}
export default Layout;
