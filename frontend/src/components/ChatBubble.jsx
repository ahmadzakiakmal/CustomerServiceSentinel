import Image from "next/image";
import MarkdownRenderer from "./MarkdownRenderer";

export default function ChatBubble({ isSender, content, time, isError, image, senderStyle, botStyle, errorStyle }) {
  if (isSender)
    return (
      <div className="w-full flex flex-row-reverse gap-4 items-center justify-start py-[7px]">
        {/* <div className="size-[44px] bg-gradient-to-br from-dark-brown to-light-yellow rounded-full" /> */}
        <div className="bg-light-yellow py-[10px] px-4 rounded-[8px] max-w-[50ch] text-justify flex flex-col" style={senderStyle}>
          <MarkdownRenderer text={content} />
          <span className="text-[12px] font-medium text-right">
            {time?.getHours() < 10 ? "0" + time.getHours().toString() : time.getHours()}:
            {time?.getMinutes() < 10 ? "0" + time.getMinutes().toString() : time.getMinutes().toString()}
          </span>
        </div>
      </div>
    );
  return (
    <div className="w-full flex gap-4 items-start py-[7px]">
      <div className="size-[44px] flex-shrink-0 bg-gradient-to-br from-dark-brown to-light-yellow rounded-full relative">
        {image && (
          <Image
            alt="Bot Image"
            src={image}
            width={44}
            height={44}
            className="h-[44px] absolute select-none"
          />
        )}
      </div>
      <div
        className={
          "bg-[#EBEBEB] py-[10px] px-4 rounded-[8px] max-w-[50ch] text-justify "
        }
        style={isError ? errorStyle : botStyle}
      >
        <MarkdownRenderer text={content} />
      </div>
    </div>
  );
}

