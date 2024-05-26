import Image from "next/image";
import ChatBubble from "./ChatBubble";

export default function ChatPage({ messages = [], colors, botImage }) {
  return (
    <main
      className="p-[2.5%] md:p-5 lg:p-10 outline-1 outline-dashed rounded-md"
      style={{ backgroundColor: colors?.background ?? "auto" }}
    >
      {messages.map((message, index) => {
        return (
          <ChatBubble
            content={message.content ?? ""}
            image={botImage}
            isError={message.isError}
            isSender={index % 2 == 0}
            time={new Date()}
            key={index}
            botStyle={{
              backgroundColor: colors?.bot ?? "auto",
              color: colors?.botTxt ?? "auto",
            }}
            senderStyle={{
              backgroundColor: colors?.user ?? "auto",
              color: colors?.userTxt ?? "auto",
            }}
            errorStyle={{
              backgroundColor: colors?.bot ?? "auto",
              color: colors?.error ?? "auto",
            }}
          />
        );
      })}
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
          style={{ backgroundColor: colors?.bot ?? "auto" }}
        >
          <div
            className="size-[6px] bg-dark-brown rounded-full animate-chat-loading"
            style={{ backgroundColor: colors?.botTxt ?? "auto" }}
          />
          <div
            className="size-[6px] bg-dark-brown rounded-full animate-chat-loading delay-1"
            style={{ backgroundColor: colors?.botTxt ?? "auto" }}
          />
          <div
            className="size-[6px] bg-dark-brown rounded-full animate-chat-loading delay-2"
            style={{ backgroundColor: colors?.botTxt ?? "auto" }}
          />
        </div>
      </div>
    </main>
  );
}
