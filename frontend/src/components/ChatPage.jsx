import ChatBubble from "./ChatBubble";

export default function ChatPage({ orgId, messages = [], colors }) {
  return (
    <main
      className="p-10 outline-1 outline-dashed rounded-md"
      style={{ backgroundColor: colors?.background ?? "auto" }}
    >
      {messages.map((message, index) => {
        return (
          <ChatBubble
            content={message.content ?? ""}
            image=""
            isError={message.isError}
            isSender={index % 2 == 0}
            time={new Date()}
            key={index}
            botStyle={{ 
              backgroundColor: colors?.bot ?? "auto",
              color: colors?.botTxt ?? "auto" 
            }}
            senderStyle={{ 
              backgroundColor: colors?.user ?? "auto", 
              color: colors?.userTxt ?? "auto" 
            }}
            errorStyle={{
              backgroundColor: colors?.bot ?? "auto",
              color: colors?.error ?? "auto"
            }}
          />
        );
      })}
    </main>
  );
}
