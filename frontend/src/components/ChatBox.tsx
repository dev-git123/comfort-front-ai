import { useState } from "react";
import axios from "axios";
import ChatMessage from "./ChatMessage";

function ChatBox() {
  const [messages, setMessages] = useState<{ sender: string; message: string }[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { sender: "user", message: input }];
    setMessages(newMessages);
    setInput("");

    try {
      // Call free LLM API (Hugging Face example)
      const res = await axios.post(
        "https://api-inference.huggingface.co/models/gpt2",
        { inputs: input },
        {
          headers: { Authorization: "Bearer YOUR_HUGGINGFACE_TOKEN" },
        }
      );

      const botReply = res.data[0]?.generated_text || "Sorry, I can't respond right now.";

      setMessages([...newMessages, { sender: "bot", message: botReply }]);
    } catch (err) {
      setMessages([...newMessages, { sender: "bot", message: "Error contacting model." }]);
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <div style={{ minHeight: 400, border: "1px solid #ccc", padding: 12, overflowY: "auto" }}>
        {messages.map((m, i) => (
          <ChatMessage key={i} message={m.message} sender={m.sender as "user" | "bot"} />
        ))}
      </div>
      <div style={{ display: "flex", marginTop: 8 }}>
        <input
          style={{ flex: 1, padding: 8 }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button style={{ padding: "8px 12px" }} onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBox;