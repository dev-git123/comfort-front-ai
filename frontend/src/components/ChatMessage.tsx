type Props = {
  message: string;
  sender: "user" | "bot";
};

function ChatMessage({ message, sender }: Props) {
  return (
    <div
      style={{
        textAlign: sender === "user" ? "right" : "left",
        margin: "8px 0",
      }}
    >
      <span
        style={{
          whiteSpace: "pre-wrap",
          display: "inline-block",
          padding: "8px 12px",
          borderRadius: "12px",
          backgroundColor: sender === "user" ? "#4f46e5" : "#e5e7eb",
          color: sender === "user" ? "white" : "black",
        }}
      >
        {message}
      </span>
    </div>
  );
}

export default ChatMessage;