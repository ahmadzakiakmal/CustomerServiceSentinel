import ChatBubble from "@/components/ChatBubble";
import Dropdown from "@/components/Dropdown";
import Layout from "@/components/Layout";
import cutMessage from "@/utilities/cutMessage";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IoSendSharp } from "react-icons/io5";

export default function Dashboard() {
  const [activeOrganization, setActiveOrganization] = useState("");
  const [organizatons, setOrganizations] = useState([]);
  const [name, setName] = useState("");
  const [instruction, setInstructions] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/organization", {
        withCredentials: true,
      })
      .then((res) => {
        const mapOwnedOrgs = res.data.owned.map((org) => {
          return {
            value: org._id.$oid,
            label: org.organization_name,
          };
        });
        const mapMemberOrgs = res.data.member.map((org) => {
          return {
            value: org._id.$oid,
            label: org.organization_name,
          };
        });
        setOrganizations([...mapOwnedOrgs, ...mapMemberOrgs]);
      })
      .catch((err) => {
        toast.error(cutMessage(err?.response?.data?.message) ?? "Can't connect to server", {
          className: "custom-error",
        });
      });
  }, []);

  useEffect(() => {
    if (!activeOrganization) return;
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/assistant-data/" + activeOrganization, {
        withCredentials: true,
      })
      .then((res) => {
        setName(res.data.name);
        if (res.data.instruction !== "") {
          setInstructions(res.data.instruction);
        } else {
          setInstructions(
            "You are made as a customer service assistant. The user can customize you to fit their organization by giving you data. Tell them to customize your instruction. Refrain from answering questions beyond your job as a customer service."
          );
        }
      })
      .catch((err) => {
        toast.error(cutMessage(err?.response?.data?.message) ?? "Can't connect to server", {
          className: "custom-error",
        });
      });
  }, [activeOrganization]);

  function handleChat(e) {
    e.preventDefault();
    const newMessage = {
      content: message,
      isSender: true,
      time: new Date(),
    };
    const newMessages = [...messages, newMessage];
    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
    axios
      .post(
        process.env.NEXT_PUBLIC_API_URL + "/chatbot/chat/" + activeOrganization,
        {
          messages: newMessages.map((message) => {
            return({
              role: message.isSender ? "user" : "assistant",
              content: message.content 
            });
          })
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        const completion = res.data.completion;
        const reply = {
          role: "assistant",
          content: completion
        };
        setMessages((prev) => [...prev, reply]);
      })
      .catch((err) => toast.error(err?.response?.data?.message ?? "Can't connect to server"));
  }

  return (
    <main>
      <Layout>
        <main className="text-dark-brown flex min-h-screen overflow-y-hidden">
          <section className="min-w-[340px] border-r border-[#CACACA] p-10 flex-shrink-0">
            <h1 className="text-[24px] font-medium mb-[50px]">Testing</h1>
            <Dropdown
              className="w-full"
              state={activeOrganization}
              setState={setActiveOrganization}
              options={organizatons}
            />
            <label className="flex flex-col gap-2 font-medium mt-4">
              Name
              <input
                type="text"
                className="w-full rounded-md outline outline-1 outline-light-brown px-3 py-2 lg:py-2.5 text-black font-normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className="flex flex-col gap-2 font-medium mt-4">
              Instructions
              <textarea
                className="w-full text-justify min-h-[150px] rounded-md outline outline-1 outline-light-brown px-3 py-2 lg:py-2.5 font-normal text-black"
                onChange={(e) => setInstructions(e.target.value)}
                value={instruction}
              />
            </label>
            <label className="flex flex-col gap-2 font-medium mt-4">
              Additional Data
              <input
                type="file"
                className="hidden"
              />
              <div className="w-full py-5 cursor-pointer text-light-brown rounded-md outline-1 outline-light-brown outline-dashed px-3 lg:py-2.5 font-medium">
                File
              </div>
            </label>
          </section>

          <section className="w-full flex flex-col max-h-screen relative">
            <h1 className="text-[24px] font-medium p-10 ">Chat</h1>

            <div className="max-h-full overflow-y-auto">
              <div className="px-10 bg-white mb-[80px]">
                {messages.map((message, index) => {
                  return (
                    <ChatBubble
                      key={index}
                      isSender={message.isSender}
                      content={message.content}
                      time={message.time}
                    />
                  );
                })}
              </div>
              <form
                className="pb-2 pt-4 px-10 absolute bottom-0 w-full bg-white border-t gap-2"
                onSubmit={(e) => {
                  handleChat(e);
                }}
              >
                <div className="flex outline outline-1 outline-[#CACACA] rounded-md">
                  <input
                    type="text"
                    className="w-full px-3 py-2 lg:py-2.5 text-black font-normal focus:outline-none"
                    placeholder="Write your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="p-3 text-[20px] text-black disabled:opacity-30 disabled:cursor-not-allowed"
                    disabled={message === ""}
                  >
                    <IoSendSharp />
                  </button>
                </div>
              </form>
            </div>
          </section>
        </main>
      </Layout>
    </main>
  );
}
