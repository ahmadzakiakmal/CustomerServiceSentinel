import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { ImSpinner8 } from "react-icons/im";
import { IoSendSharp } from "react-icons/io5";
import ChatBubble from "@/components/ChatBubble";
import Image from "next/image";
import Logo from "./.././../../public/assets/css_logo_wtext.svg";

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

  const [botBubbleColor, setBotBubbleColor] = useState("#EBEBEB");
  const [botTextColor, setBotTextColor] = useState("#000000");
  const [userBubbleColor, setUserBubbleColor] = useState("#FFF3D9");
  const [userTextColor, setUserTextColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [errorColor, setErrorColor] = useState("#B12525");

  const scrollToBottom = () => {
    console.log(scrollableContainerRef.current);
    if (scrollableContainerRef.current) {
      scrollableContainerRef.current.scrollTo({
        top: scrollableContainerRef.current.scrollHeight,
        behavior: "smooth",
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
    setIsLoading(true);
    setHost(window.location.host);
    if (!orgId || organization.name !== "") return;
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/organization/data/" + orgId)
      .then((res) => {
        console.log(res.data);
        setOrganization({ name: res.data.organization_name, botName: res.data.bot_name, files: res.data.files });
        if (!res?.data?.colors?.user_bubble_color) {
          setUserBubbleColor("#FFF3D9");
          setUserTextColor("#000000");
          setBackgroundColor("#FFFFFF");
          setBotBubbleColor("#EBEBEB");
          setBotTextColor("#000000");
          setErrorColor("#B12525");
          return setIsLoading(false);
        }
        setUserBubbleColor(res.data.colors.user_bubble_color);
        setUserTextColor(res.data.colors.user_text_color);
        setBackgroundColor(res.data.colors.background_color);
        setBotBubbleColor(res.data.colors.bot_bubble_color);
        setBotTextColor(res.data.colors.bot_text_color);
        setErrorColor(res.data.colors.error_text_color);
        setBotImage(process.env.NEXT_PUBLIC_API_URL + "/assistant-data/image/" + orgId);
        return setIsLoading(false);
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
        {isLoading && (
          <div className="fixed top-0 left-0 w-full h-full bg-dark-brown/80 backdrop-blur-[8px] z-[20] flex flex-col justify-center items-center">
            <Image src={Logo} alt="CSS Logo" className="animate-pulse" />
            {/* <h1 className="text-[25px] font-semibold text-white">Connecting...</h1> */}
          </div>
        )}
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
              style={{ backgroundColor: backgroundColor }}
            >
              <div className="px-10 mb-[80px] pt-12">
                {messages.map((message, index) => {
                  return (
                    <ChatBubble
                      key={index}
                      isSender={message.isSender}
                      content={message.content}
                      time={message.time}
                      isError={message.isError}
                      image={message.image}
                      botStyle={{
                        backgroundColor: botBubbleColor ?? "auto",
                        color: botTextColor ?? "auto",
                      }}
                      senderStyle={{
                        backgroundColor: userBubbleColor ?? "auto",
                        color: userTextColor ?? "auto",
                      }}
                      errorStyle={{
                        backgroundColor: botBubbleColor ?? "auto",
                        color: errorColor ?? "auto",
                      }}
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
                    <div
                      className="bg-[#EBEBEB] py-[10px] px-4 rounded-[8px] flex gap-3 min-h-[44px] items-center"
                      style={{ backgroundColor: botBubbleColor }}
                    >
                      <div
                        className="size-[6px] bg-dark-brown rounded-full animate-chat-loading"
                        style={{ backgroundColor: botTextColor }}
                      />
                      <div
                        className="size-[6px] bg-dark-brown rounded-full animate-chat-loading delay-1"
                        style={{ backgroundColor: botTextColor }}
                      />
                      <div
                        className="size-[6px] bg-dark-brown rounded-full animate-chat-loading delay-2"
                        style={{ backgroundColor: botTextColor }}
                      />
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
