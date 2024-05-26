import { useRouter } from "next/router";
import Link from "next/link";
import React from "react";
import ProfilePicture from "./icons/favicon.ico";
import { BiSolidDashboard } from "react-icons/bi";
import { IoChatboxEllipses } from "react-icons/io5";
import { MdNoteAlt } from "react-icons/md";
import { GrOrganization } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";

const Sidebar = () => {
  const router = useRouter();

  return (
    <aside className="sidebar bg-dark-brown text-white fixed bottom-0 md:bottom-auto z-[10] h-screen">
      <div className="sidebar-content">
        <div className="profile-section text-white flex flex-col justify-center items-center mb-[75px]">
          <div className="profile-picture bg-white size-[60px] rounded-full mb-5" />
          <h2 className="text-[18px] hidden md:block font-semibold">Username</h2>
        <div className="links-section flex flex-col gap-10 px-[30px] lg:px-[50px]">
          <SidebarLink
            text="Testing"
            link="/dashboard/testing"
            icon={<MdNoteAlt />}
            active={router.pathname === "/dashboard/testing"}
          />
          <SidebarLink
            text="Appearance"
            link="/dashboard/appearance"
            icon={<IoChatboxEllipses />}
            active={router.pathname === "/dashboard/appearance"}
          />
          <SidebarLink
            text="Organization"
            link="/dashboard/organization"
            icon={<GrOrganization />}
            active={router.pathname === "/dashboard/organization"}
          />
        </div>
      </div>

      <div className="logout-section w-full px-[50px] mt-[200px]">
        <Link href="/">
          <button className="logout-button block text-[18px] font-medium rounded-[5px] px-3 py-2 hover:bg-light-yellow/20 active:bg-light-yellow/50 transition w-full">
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
      className={`sidebar-link flex items-center gap-2 text-[18px] font-medium rounded-[5px] px-3 py-2 hover:bg-light-yellow/20 transition 
      ${active ? "!bg-light-yellow/40" : ""}`}
      href={link}
    >
      <span className="icon text-[20px] md:text-[16px]">{icon}</span>
      <span className="link-text hidden md:block">{text}</span>
    </Link>
  );
}

export default Sidebar;
