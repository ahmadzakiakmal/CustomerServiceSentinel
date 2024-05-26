import React from "react";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <div className="min-h-screen h-full flex flex-row justify-start items-stretch text-dark-brown max-w-screen overflow-hidden">
      <Sidebar />
      <main className="bg-white flex-1 text-dark-brown">{children}</main>
    </div>
  );
}
export default Layout;
