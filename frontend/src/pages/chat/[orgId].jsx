import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { ImSpinner8 } from "react-icons/im";
import { IoSendSharp } from "react-icons/io5";
import ChatBubble from "@/components/ChatBubble";
import Image from "next/image";

export default function ChatPage() {
  const router = useRouter();
  const { orgId } = router.query;

  const [organization, setOrganization] = useState({ name: "", botName: "", files: [] });
  const [botImage, setBotImage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollableContainerRef = useRef(null);
  const inputRef = useRef(null);
  const [host, setHost] = useState("");

  const scrollToBottom = () => {
    console.log(scrollableContainerRef.current);
    if (scrollableContainerRef.current) {
      scrollableContainerRef.current.scrollTo({
        top: scrollableContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  };

  const refocusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

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
    setTimeout(() => {
      scrollToBottom();
    }, 100);
    axios
      .post(
        process.env.NEXT_PUBLIC_API_URL +
          "/chatbot/" +
          (organization.files.length == 0 ? "default/" : "langchain/") +
          orgId,
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
          className: "custom",
        });
        const errorMessage = {
          role: "assistant",
          content: err?.response?.data?.message ?? "Can't connect to server",
          isError: true,
          image: botImage,
        };
        setMessages((prev) => [...prev, errorMessage]);
      })
      .finally(() => {
        setIsBotTyping(false);
        setTimeout(() => {
          scrollToBottom();
          refocusInput();
        }, 100);
      });
  }

  useEffect(() => {
    console.log(window.location.host);
    setHost(window.location.host);
    if (!orgId || organization.name !== "") return;
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/organization/data/" + orgId)
      .then((res) => {
        console.log(res.data);
        setOrganization({ name: res.data.organization_name, botName: res.data.bot_name, files: res.data.files });
        setBotImage(process.env.NEXT_PUBLIC_API_URL + "/assistant-data/image/" + orgId);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line
  }, [orgId]);

  return (
    <>
      <Head>
        <title>
          {organization.name !== ""
            ? `${organization.botName} from ${organization?.name}`
            : "Customer Service Sentinel"}
        </title>
      </Head>
      <main className="flex justify-center items-center">
        <main className="w-full //max-w-[800px] h-screen relative">
          <nav className="bg-dark-brown text-white py-6 px-10 absolute top-0 w-full z-[1]">
            <p>
              <span className="font-medium text-xl">{organization?.botName}</span>
              &nbsp; ({organization.name})
            </p>
          </nav>
          <section className="h-full">
            <div
              ref={scrollableContainerRef}
              className="max-h-full overflow-y-auto pt-10 relative h-full pb-[30px]"
            >
              <div className="px-10 bg-white mb-[80px] pt-12">
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
                className="pt-4 pb-1 px-5 md:px-10 fixed bottom-0 w-full bg-white border-t gap-2 //max-w-[800px]"
                onSubmit={(e) => {
                  sendMessage(e);
                }}
              >
                <div className="flex outline outline-1 outline-[#CACACA] rounded-md mb-1">
                  <input
                    type="text"
                    className="w-full px-3 py-2 lg:py-2.5 text-black font-normal focus:outline-none disabled:bg-slate-400/10"
                    placeholder="Write your message here..."
                    value={message}
                    ref={inputRef}
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
                <div className="text-black/40 text-[14px]">
                  Powered by{" "}
                  <a
                    href={"http://" + host}
                    target="_blank"
                    rel="norel noreferrer"
                    className="underline"
                  >
                    CustomerServiceSentinel
                  </a>
                </div>
              </form>
            </div>
          </section>
        </main>
      </main>
    </>
  );
}
