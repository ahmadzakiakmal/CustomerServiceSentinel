export default function ChatBubble({ isSender, text }) {
  if (isSender)
    return (
      <div className="w-full flex flex-row-reverse gap-4 items-center justify-start py-[7px]">
        <div className="size-[44px] bg-gradient-to-br from-dark-brown to-light-yellow rounded-full" />
        <div className="bg-light-yellow py-[10px] px-4 rounded-[8px] max-w-[50%] text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, commodi!</div>
      </div>
    );
  return (
    <div className="w-full flex gap-4 items-center py-[7px]">
      <div className="size-[44px] bg-gradient-to-br from-dark-brown to-light-yellow rounded-full" />
      <div className="bg-[#EBEBEB] py-[10px] px-4 rounded-[8px] max-w-[50%] text-justify">Hello</div>
    </div>
  );
}
