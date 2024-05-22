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
    <aside className="bg-dark-brown w-full md:w-fit md:min-h-screen flex flex-row md:flex-col items-center justify-start py-6 md:py-10 text-white fixed md:relative bottom-0 md:bottom-auto z-[10]">
      <div className="w-full flex flex-row justify-center md:justify-start md:flex-col">
        <div className="text-white flex flex-col justify-center items-center md:mb-[75px] mr-10 md:mr-0">
          <div className="bg-white size-[30px] md:size-[60px] rounded-full mb-0 md:mb-5" />
          <h2 className="text-[18px] hidden md:block font-semibold">Username</h2>
        </div>

        <div className="flex flex-row md:flex-col gap-10 md:w-full px-0 md:px-[30px] lg:px-[50px] justify-center">
          {/* <SidebarLink
            text="Dashboard"
            link="/dashboard"
            icon={<BiSolidDashboard />}
            active={router.pathname === "/dashboard"}
          /> */}
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

      <div className="hidden md:block *:w-full px-[50px] mt-[200px] ">
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
      className={`flex items-center gap-2 md:w-full lg:w-[175px] text-[18px] font-medium rounded-[5px] px-3 py-2 hover:bg-light-yellow/20 transition 
      ${active ? "!bg-light-yellow/40" : ""}`}
      href={link}
    >
      <span className="text-[20px] md:text-[16px]">{icon ?? icon}</span>
      <span className="hidden md:block">{text}</span>
    </Link>
  );
}

export default Sidebar;
