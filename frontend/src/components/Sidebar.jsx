import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoChatboxEllipses } from "react-icons/io5";
import { MdNoteAlt } from "react-icons/md";
import { GrOrganization } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import axios from "axios";
import { toast } from "react-toastify";

const Sidebar = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setUsername(localStorage.getItem("Username"));
  }, []);

  return (
    <aside className="bg-dark-brown w-full md:w-fit md:min-h-screen flex flex-row md:flex-col items-center justify-start py-6 md:py-10 text-white fixed md:relative bottom-0 md:bottom-auto z-[10] shadow-[0_0px_5px_#FFDD93]">
      <div className="w-full flex flex-row justify-center md:justify-start md:flex-col">
        <div className="text-white flex flex-col justify-center items-center md:mb-[75px] mr-10 md:mr-0">
          <div className="relative">
            <button className={"relative hover:bg-light-yellow/20 px-3 py-2 rounded-[5px] " + (open ? "!bg-light-yellow/40" : "")} onClick={() => setOpen(!open)}>
              <CgProfile className="text-[25px] md:text-[60px] rounded-full mb-0 md:mb-5" />
            </button>
            <div
              className={"md:hidden px-4 py-3 bg-dark-brown transition-[grid-template-rows,padding,outline] overflow-y-hidden outline outline-1 outline-yellow shadow-[0_0_5px_#39311D] rounded-[5px] absolute bottom-[calc(100%+8px)] left-[50%] translate-x-[-50%] max-w-[140px] grid place-items-center " + 
            (open ? "grid-rows-[1fr]" : "grid-rows-[0fr] !py-0 !outline-none")}
            >
              <div className="overflow-hidden w-max">
                <h2 className="text-[16px] font-semibold w-max">{username}</h2>
                <div className="h-[1px] w-full bg-white my-1" />
                <button
                  className="rounded-[5px] hover:bg-light-yellow/20 active:bg-light-yellow/50 px-3 w-full py-1"
                  onClick={() => {
                    axios
                      .post(process.env.NEXT_PUBLIC_API_URL + "/user/logout", {}, { withCredentials: true })
                      .then(() => {
                        toast.success("Logged out successfully", { className: "custom" });
                        router.replace("/");
                      })
                      .catch(() => {
                        toast.error("An error occured when logging out", { className: "custom" });
                      });
                  }}
                >
                  <div className="block text-[14px] font-medium transition w-full">Log Out</div>
                </button>
              </div>
            </div>
          </div>
          <h2 className="text-[18px] hidden md:block font-semibold">{username}</h2>
        </div>

        <div className="flex flex-row md:flex-col gap-10 md:w-full px-0 md:px-[30px] lg:px-[50px] justify-center">
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
            active={router.pathname === "/dashboard/chat"}
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
        <button
          onClick={() => {
            axios
              .post(process.env.NEXT_PUBLIC_API_URL + "/user/logout", {}, { withCredentials: true })
              .then(() => {
                toast.success("Logged out successfully", { className: "custom" });
                router.replace("/");
              })
              .catch(() => {
                toast.error("An error occured when logging out", { className: "custom" });
              });
          }}
        >
          <div className="block text-[16px] lg:text-[18px] font-medium rounded-[5px] px-3 py-2 hover:bg-light-yellow/20 active:bg-light-yellow/50 transition w-full">
            Log Out
          </div>
        </button>
      </div>
    </aside>
  );
};

function SidebarLink({ text, link, active = false, icon = "" }) {
  return (
    <Link
      className={`flex items-center gap-2 md:w-full lg:w-[175px] text-[16px] lg:text-[18px] font-medium rounded-[5px] px-3 py-2 hover:bg-light-yellow/20 transition 
      ${active ? "!bg-light-yellow/40" : ""}`}
      href={link}
    >
      <span className="text-[20px] md:text-[16px]">{icon ?? icon}</span>
      <span className="hidden md:block">{text}</span>
    </Link>
  );
}

export default Sidebar;
