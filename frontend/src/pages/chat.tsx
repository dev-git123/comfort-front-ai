import { useParams } from "react-router-dom";
import { useState } from "react";

function Chat() {
  const { roomId } = useParams();
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input) return;
    setMessages([...messages, input]);
    setInput("");
  };

  return (
    <div>
      <h1>Chat Room: {roomId}</h1>
      <div style={{ border: "1px solid gray", height: "300px", overflowY: "scroll" }}>
        {messages.map((msg, i) => (
          <p key={i}>{msg}</p>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}


export default Chat;