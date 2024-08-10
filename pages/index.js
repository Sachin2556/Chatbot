// pages/index.js
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newChat = [...chat, { sender: "user", message: input }];
    setChat(newChat);
    setInput("");

    try {
      const res = await axios.post("/api/openai", { message: input });
      const botResponse = res.data.response;

      setChat([...newChat, { sender: "bot", message: botResponse }]);
    } catch (error) {
      console.error("Error fetching the response", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>AI-Powered Customer Support Chatbot</h1>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "5px",
          height: "400px",
          overflowY: "scroll",
          marginBottom: "20px",
        }}
      >
        {chat.map((msg, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <strong>{msg.sender === "user" ? "You: " : "Bot: "}</strong>
            <span>{msg.message}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message"
          style={{ width: "80%", padding: "10px" }}
        />
        <button type="submit" style={{ padding: "10px 20px" }}>
          Send
        </button>
      </form>
    </div>
  );
}
