import ChatBubble from "@/components/ChatBubble";
import Dropdown from "@/components/Dropdown";
import Layout from "@/components/Layout";
import cutMessage from "@/utilities/cutMessage";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IoSendSharp } from "react-icons/io5";
import { ImSpinner8 } from "react-icons/im";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaFileAlt } from "react-icons/fa";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { BsInfoCircleFill } from "react-icons/bs";
import Button from "@/components/Button";
import Image from "next/image";

export default function Dashboard() {
  const [activeOrganization, setActiveOrganization] = useState("");
  const [organizatons, setOrganizations] = useState([]);
  const [name, setName] = useState("");
  const [instruction, setInstructions] = useState("");
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [initialName, setInitialName] = useState("");
  const [initialInstruction, setInitialInstruction] = useState("");
  const [botImage, setBotImage] = useState("");
  // const [initialFile, setInitialFile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [inputImage, setInputImage] = useState({});
  const [inputImageLink, setInputImageLink] = useState("");

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
    setIsLoading(true);
    setMessages([]);
    setInputImage({});
    setInputImageLink("");
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/assistant-data/" + activeOrganization, {
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res);
        setFiles(res.data.files);
        setName(res.data.name);
        setInitialName(res.data.name);
        setBotImage(
          res.data.image ? process.env.NEXT_PUBLIC_API_URL + "/assistant-data/image/" + activeOrganization : ""
        );
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
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [activeOrganization]);

  useEffect(() => {
    if (name !== initialName || instruction !== initialInstruction) setIsDataChanged(true);
    else setIsDataChanged(false);
  }, [name, instruction, initialInstruction, initialName]);

  function sendMessage(e) {
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
        process.env.NEXT_PUBLIC_API_URL +
          "/chatbot/" +
          (files.length == 0 ? "default/" : "langchain/") +
          activeOrganization,
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
        const completion = res.data.completion;
        // console.log(completion);
        const reply = {
          role: "assistant",
          content: completion,
          image: botImage,
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

  function saveData() {
    if(!isDataChanged && inputImageLink === "") {
      return toast.error("No changes to save", {
        className: "custom-error"
      });
    }
    setIsLoading(true);
    const loadingToast = toast.loading("Saving...", { className: "custom-loading" });
    const formData = new FormData();
    if(isDataChanged) {
      formData.append("name", name);
      formData.append("instruction", instruction);
    }
    formData.append("file", inputImage);
    axios
      .patch(
        process.env.NEXT_PUBLIC_API_URL + "/assistant-data/" + activeOrganization,
        formData,
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
        setIsDataChanged(false);
      });
  }

  function deleteFile(filename) {
    const toastPromise = toast.loading("Deleting...", {
      className: "custom-loading",
    });
    axios
      .delete(process.env.NEXT_PUBLIC_API_URL + "/assistant-data/file/" + activeOrganization + "/" + filename)
      .then(() => {
        toast.update(toastPromise, {
          type: "success",
          isLoading: false,
          render: "File deleted successfully",
          className: "custom-success",
          autoClose: 5000,
        });
        const newFiles = files.filter((file) => file !== filename);
        setFiles(newFiles);
      })
      .catch((err) => {
        toast.update(toastPromise, {
          render: err?.response?.data?.message ?? "Can't connect to server",
          type: "error",
          isLoading: false,
          autoClose: 5000,
          className: "custom-error",
        });
      });
  }

  return (
    <main>
      <Layout>
        <main className="text-dark-brown flex min-h-screen overflow-y-hidden">
          <section className="min-w-[340px] border-r border-[#CACACA] p-10 flex-shrink-0 relative">
            {isLoading && (
              <div className="w-full h-full bg-dark-brown/60 backdrop-blur-[8px] absolute left-0 top-0 z-[2] flex justify-center items-center">
                <h1 className="text-[25px] font-semibold animate-pulse text-white">
                  Loading...
                </h1>
              </div>
            )}
            <h1 className="text-[24px] font-medium mb-[50px]">Testing</h1>
            <Dropdown
              className="w-full z-[1]"
              state={activeOrganization}
              setState={setActiveOrganization}
              options={organizatons}
            />
            <div className="mt-4 mb-2">
              <div className="flex items-center gap-2">
                <h1 className="font-medium">Bot Photo</h1>
                <div className="relative select-none">
                  <BsInfoCircleFill className="cursor-pointer" onMouseEnter={() => {
                    const info = document.querySelector("#image-info");
                    info.classList.toggle("hidden");
                    setTimeout(() => {
                      info.classList.toggle("opacity-100");
                    }, 100);
                  }} 
                  onMouseLeave={() => {
                    const info = document.querySelector("#image-info");
                    info.classList.toggle("opacity-0");
                    setTimeout(() => {
                      info.classList.toggle("hidden");
                    }, 100);
                  }}
                  />
                  <div id="image-info" className="hidden opacity-0 transition-opacity bg-white outline outline-1 outline-dark-brown absolute w-max px-2 py-1 rounded-md top-[calc(100%+8px)] left-0">
                    Use <strong>1:1 aspect ratio</strong> images
                    <br />
                    Max size <strong>1 MB</strong>
                  </div>
                </div>
              </div>
              {
                botImage !== "" ? (
                  <div className="flex gap-2 items-end">
                    <div className="size-[80px] relative flex justify-center items-center">
                      <Image
                        src={inputImageLink !== "" ? inputImageLink : botImage}
                        alt="Bot Photo"
                        width={80}
                        height={80}
                        className="h-full absolute select-none"
                      />
                    </div>
                    <label htmlFor="photo-change-input" className="cursor-pointer underline font-semibold">
                      Change
                    </label>
                    <input
                      type="file"
                      className="hidden"
                      id="photo-change-input"
                      name="photo-change-input"
                      accept=".jpg,.png"
                      onChange={(e) => {
                        if(!e.target.files[0]) return;
                        if(e.target.files[0].size > 1024 * 1024) {
                          return toast.error("Image exceeds size limit", {
                            className: "custom-error"
                          });
                        }
                        const blob = URL.createObjectURL(e.target.files[0]);
                        setInputImage(e.target.files[0]);
                        setInputImageLink(blob);
                      }}
                    />
                  </div>
                ) : (
                  <>
                    <label
                      htmlFor="photo-input"
                      className="w-[80px] h-[80px] flex justify-center items-center gap-2 py-5 cursor-pointer text-light-brown rounded-md outline-1 outline-light-brown outline-dashed px-3 lg:py-2.5 font-medium text-center"
                    >
                      Add Photo
                    </label>
                    <input
                      type="file"
                      className="hidden"
                      id="photo-input"
                      name="photo-input"
                      accept=".jpg,.png"
                    />
                  </>
                )
              }
            </div>
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
            <h1 className="flex flex-col gap-2 font-medium mt-4 mb-2">Additional Data</h1>
            <div className="flex flex-col gap-1 my-2">
              {files.map((file, index) => {
                // console.log();
                return (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center gap-1">
                      <FaFileAlt />
                      {file.length > 15
                        ? file.slice(0, file.length - 4).slice(0, 15) +
                          "... [" +
                          file.slice(file.length - 4, file.length) +
                          "]"
                        : file}
                    </div>
                    <button
                      className="pr-1"
                      onClick={() => deleteFile(file)}
                    >
                      <RiDeleteBin6Fill className="text-red-delete hover:text-red-900" />
                    </button>
                  </div>
                );
              })}
            </div>
            <label
              htmlFor="file-input"
              className="w-full flex justify-center items-center h-[80px] gap-2 py-5 cursor-pointer text-light-brown rounded-md outline-1 outline-light-brown outline-dashed px-3 lg:py-2.5 font-medium"
            >
              Upload File
            </label>
            <input
              type="file"
              className="hidden"
              id="file-input"
              name="file-input"
              accept=".txt"
            />
            {(isDataChanged || inputImageLink !== "")  && <div className="mt-4 text-red-delete">⚠️ You have unsaved changes</div>}
            <Button
              className="w-full text-[16px] !font-medium mt-2"
              onClick={() => {
                saveData();
              }}
            >
              Save
            </Button>
          </section>

          <section className="w-full flex flex-col max-h-screen relative">
            <div className="flex w-full justify-between items-center p-10">
              <h1 className="text-[24px] font-medium">Chat</h1>
              <button
                className={" flex justify-center items-center gap-2 hover:bg-dark-brown/10 px-3 py-2 rounded-md transition-colors active:bg-dark-brown/20" + 
                (messages.length == 0 ? " hidden" : "")}
                onClick={() => {
                  setMessages([]);
                }}
              >
                Reset Chat <FaArrowRotateLeft className="" />
              </button>
            </div>

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
                      image={message.image}
                    />
                  );
                })}
                {isBotTyping && (
                  <div className="w-full flex gap-4 items-start py-[7px]">
                    <div className="size-[44px] flex-shrink-0 bg-gradient-to-br from-dark-brown to-light-yellow rounded-full">
                      {botImage && (
                        <Image
                          alt="Bot Image"
                          src={botImage}
                          width={44}
                          height={44}
                          className="h-[44px] absolute select-none"
                        />
                      )}
                    </div>
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
                  sendMessage(e);
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
                    disabled={isBotTyping || isLoading}
                  />
                  <button
                    type="submit"
                    className="p-3 text-[20px] text-black disabled:cursor-not-allowed disabled:text-black/60 disabled:bg-slate-400/10"
                    disabled={message === "" || isBotTyping || isLoading}
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
