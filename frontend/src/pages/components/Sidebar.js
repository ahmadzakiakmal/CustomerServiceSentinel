import classNames from "classnames";
import { useRouter } from "next/router";
import Link from "next/link";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import ProfilePicture from "./icons/favicon.ico";

const menuItems = [
  { id: 1, label: "Dashboard", link: "/" },
  { id: 2, label: "Chat", link: "./Chat" },
  { id: 3, label: "Testing", link: "./Testing" },
  { id: 4, label: "Organization Data", link: "./Organization" },
];

const Sidebar = () => {
  const router = useRouter();
  const activeMenu = useMemo(
    () => menuItems.find((menu) => menu.link === router.pathname),
    [router.pathname]
  );
  const getNavItemClasses = (menu) => {
    return classNames(
      "flex items-center cursor-pointer hover:bg-light-brown rounded w-full overflow-hidden whitespace-nowrap",
      {
        ["bg-light-lighter"]: activeMenu.id === menu.id,
      }
    );
  };

  return (
    <div className="h-screen flex flex-col justify-between w-full md:w-72 p-4 md:p-8 text-white bg-dark-brown">
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center ml-1">
          <Image
            src={ProfilePicture}
            alt="Profile Picture"
            width={56}
            height={56}
          />
        </div>
        <div className="flex justify-center items-center mt-[24px] mb-[75px]">
          <div className="flex items-center ">Name</div>
        </div>
      </div>
      <div className="flex flex-col items-center"></div>
      {menuItems.map(({ icon: Icon, ...menu }) => {
        const classes = getNavItemClasses(menu);
        return (
          <div className={`${classes} mb-10`} key={menu.id}>
            <Link legacyBehavior href={menu.link}>
              <a className="flex py-4 px-3 items-center w-full h-full">
                <span
                  className={classNames(
                    "text-md font-medium text-white items-center relative"
                  )}
                >
                  {menu.label}
                </span>
              </a>
            </Link>
          </div>
        );
      })}
      <div
        className={`${getNavItemClasses(
          {}
        )} px-3 py-4 justify-center sm:mt-10 md:mt-20 lg:mt-72`}
      >
        <span className={classNames("text-md font-medium text-text-white")}>
          Logout
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
