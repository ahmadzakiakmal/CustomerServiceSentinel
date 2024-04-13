import ChatBubble from "@/components/ChatBubble";
import Dropdown from "@/components/Dropdown";
import Layout from "@/components/Layout";
import cutMessage from "@/utilities/cutMessage";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IoSendSharp } from "react-icons/io5";
import { ImSpinner8 } from "react-icons/im";
import Button from "@/components/Button";

export default function Dashboard() {
  const [activeOrganization, setActiveOrganization] = useState("");
  const [organizatons, setOrganizations] = useState([]);
  const [name, setName] = useState("");
  const [instruction, setInstructions] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [initialName, setInitialName] = useState("");
  const [initialInstruction, setInitialInstruction] = useState("");
  // const [initialFile, setInitialFile] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [isDataChanged, setIsDataChanged] = useState(false);

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
    setMessages([]);
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/assistant-data/" + activeOrganization, {
        withCredentials: true,
      })
      .then((res) => {
        setName(res.data.name);
        setInitialName(res.data.name);
        if (res.data.instruction !== "") {
          setInstructions(res.data.instruction);
          setInitialInstruction(res.data.instruction);
        } else {
          setInstructions(
            "You are made as a customer service assistant. The user can customize you to fit their organization by giving you data. Tell them to customize your instruction. Refrain from answering questions beyond your job as a customer service."
          );
          setInitialInstruction(
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

  useEffect(() => {
    if (name !== initialName || instruction !== initialInstruction) setIsDataChanged(true);
    else setIsDataChanged(false);
  }, [name, instruction, initialInstruction, initialName]);

  function handleChat(e) {
    e.preventDefault();
    setIsBotTyping(true);
    const newMessage = {
      content: message,
      isSender: true,
      time: new Date(),
    };
    const newMessages = [...messages, newMessage];
    setMessages((prev) => [...prev, newMessage]);
    const filteredMessages = newMessages.filter((message) => {
      return !message.isError;
    });
    setMessage("");
    axios
      .post(
        process.env.NEXT_PUBLIC_API_URL + "/chatbot/test/" + activeOrganization,
        {
          messages: filteredMessages.map((message) => {
            if (message.isError) return;
            return {
              role: message.isSender ? "user" : "assistant",
              content: message.content,
            };
          }),
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
          content: completion,
        };
        setMessages((prev) => [...prev, reply]);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message ?? "Can't connect to server", {
          className: "custom-error",
        });
        const errorMessage = {
          role: "assistant",
          content: err?.response?.data?.message ?? "Can't connect to server",
          isError: true,
        };
        setMessages((prev) => [...prev, errorMessage]);
      })
      .finally(() => {
        setIsBotTyping(false);
      });
  }

  function saveData(e) {
    setIsLoading(true);
    const loadingToast = toast.loading("Saving...", {className: "custom-loading"});
    axios
      .patch(
        process.env.NEXT_PUBLIC_API_URL + "/assistant-data/" + activeOrganization,
        {
          instruction,
          name,
        },
        { withCredentials: true }
      )
      .then(() => {
        toast.update(loadingToast, {
          render: "Success",
          type: "success",
          isLoading: false,
          autoClose: 5000,
          className: "custom-success",
        });
        setMessages([]);
      })
      .catch((err) => {
        toast.update(loadingToast, {
          render: err?.response?.data?.message ?? "Can't connect to server",
          type: "error",
          isLoading: false,
          autoClose: 5000,
          className: "custom-error",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
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
            <label className="flex flex-col gap-2 font-medium mt-4 mb-2">
              Additional Data
              <input
                type="file"
                className="hidden"
              />
              <div className="w-full py-5 cursor-pointer text-light-brown rounded-md outline-1 outline-light-brown outline-dashed px-3 lg:py-2.5 font-medium">
                File
              </div>
            </label>
            {isDataChanged && <div className="mt-4 text-red-delete">⚠️ You have unsaved changes</div>}
            <Button
              disabled={!isDataChanged || isLoading}
              className="w-full text-[16px] !font-medium mt-2"
              onClick={() => {
                setIsDataChanged(false);
                saveData();
              }}
            >
              Save
            </Button>
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
                      isError={message.isError}
                    />
                  );
                })}
                {isBotTyping && (
                  <div className="w-full flex gap-4 items-start py-[7px]">
                    <div className="size-[44px] flex-shrink-0 bg-gradient-to-br from-dark-brown to-light-yellow rounded-full" />
                    <div className="bg-[#EBEBEB] py-[10px] px-4 rounded-[8px] flex gap-3 min-h-[44px] items-center">
                      <div className="size-[6px] bg-dark-brown rounded-full animate-chat-loading" />
                      <div className="size-[6px] bg-dark-brown rounded-full animate-chat-loading delay-1" />
                      <div className="size-[6px] bg-dark-brown rounded-full animate-chat-loading delay-2" />
                    </div>
                  </div>
                )}
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
                    className="w-full px-3 py-2 lg:py-2.5 text-black font-normal focus:outline-none disabled:bg-slate-400/10"
                    placeholder="Write your message here..."
                    value={message}
                    onChange={(e) => {
                      if (isBotTyping) return;
                      else setMessage(e.target.value);
                    }}
                  />
                  <button
                    type="submit"
                    className="p-3 text-[20px] text-black disabled:cursor-not-allowed disabled:text-black/60"
                    disabled={message === "" || isBotTyping}
                  >
                    {isBotTyping ? <ImSpinner8 className="text-black animate-spin" /> : <IoSendSharp />}
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
