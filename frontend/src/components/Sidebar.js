import { useRouter } from "next/router";
import Link from "next/link";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import ProfilePicture from "./icons/favicon.ico";

const Sidebar = () => {
  const router = useRouter();

  return (
    <aside className="bg-dark-brown w-[275px] h-screen flex flex-col items-center justify-between py-10 text-white">
      <div className="w-full">
        <div className="text-white flex flex-col justify-center items-center mb-[75px]">
          <div className="bg-white size-[60px] rounded-full mb-5" />
          <h2 className="text-[18px] font-semibold">Username</h2>
        </div>

        <div className="flex flex-col gap-10 w-full px-[50px]">
          <SidebarLink text="Dashboard" link="/dashboard" active={router.pathname === "/dashboard"} />
          <SidebarLink text="Chat" link="/dashboard/chat" active={router.pathname === "/dashboard/chat"} />
          <SidebarLink text="Testing" link="/dashboard/testing" active={router.pathname === "/dashboard/testing"} />
        </div>
      </div>

      <div className="w-full px-[50px]">
        <button className="block text-[18px] font-medium rounded-[5px] px-3 py-2 hover:bg-light-yellow/20 active:bg-light-yellow/50 transition w-full">Log Out</button>
      </div>
    </aside>
  );
};

function SidebarLink({ text, link, active = false }) {
  return (
    <Link
      className={`block text-[18px] font-medium rounded-[5px] px-3 py-2 hover:bg-light-yellow/20 transition 
      ${active ? "bg-light-yellow/40" : ""}`
      }
      href={link}
    >
      {text}
    </Link>
  );
}

export default Sidebar;
