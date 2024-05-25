import React from "react";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <div className="main-layout">
      <Sidebar />
      <main className="ml-64 p-4 flex-grow h-screen overflow-y-auto">
  {children}
</main>
    </div>
  );
}
export default Layout;
