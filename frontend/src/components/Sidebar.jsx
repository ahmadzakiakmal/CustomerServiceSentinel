import { useRouter } from "next/router";
import Link from "next/link";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import ProfilePicture from "./icons/favicon.ico";
import { BiSolidDashboard } from "react-icons/bi";
import { IoChatboxEllipses } from "react-icons/io5";
import { MdNoteAlt } from "react-icons/md";
import { GrOrganization } from "react-icons/gr";

const Sidebar = () => {
  const router = useRouter();

  return (
    <aside className="bg-dark-brown h-screen flex flex-col items-center justify-between py-10 text-white">
      <div className="w-full">
        <div className="text-white flex flex-col justify-center items-center mb-[75px]">
          <div className="bg-white size-[60px] rounded-full mb-5" />
          <h2 className="text-[18px] font-semibold">Username</h2>
        </div>

        <div className="flex flex-col gap-10 w-full px-[50px]">
          <SidebarLink
            text="Dashboard"
            link="/dashboard"
            icon={<BiSolidDashboard />}
            active={router.pathname === "/dashboard"}
          />
          <SidebarLink
            text="Chat"
            link="/dashboard/chat"
            icon={<IoChatboxEllipses />}
            active={router.pathname === "/dashboard/chat"}
          />
          <SidebarLink
            text="Testing"
            link="/dashboard/testing"
            icon={<MdNoteAlt />}
            active={router.pathname === "/dashboard/testing"}
          />
          <SidebarLink
            text="Organization"
            link="/dashboard/organization"
            icon={<GrOrganization />}
            active={router.pathname === "/dashboard/organization"}
          />
        </div>
      </div>

      <div className="w-full px-[50px]">
        <Link href="/">
          <button className="block text-[18px] font-medium rounded-[5px] px-3 py-2 hover:bg-light-yellow/20 active:bg-light-yellow/50 transition w-full">
            Log Out
          </button>
        </Link>
      </div>
    </aside>
  );
};

function SidebarLink({ text, link, active = false, icon = "" }) {
  return (
    <Link
      className={`flex items-center gap-2 w-[175px] text-[18px] font-medium rounded-[5px] px-3 py-2 hover:bg-light-yellow/20 transition 
      ${active ? "!bg-light-yellow/40" : ""}`}
      href={link}
    >
      {icon ?? icon}
      {text}
    </Link>
  );
}

export default Sidebar;
