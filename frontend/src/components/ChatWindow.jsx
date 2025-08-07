import { useEffect, useState } from "react";
import socket from "../socket";
import MessageInput from "./MessageInput";

// ✅ get API base URL from env
const API_BASE = import.meta.env.VITE_API_BASE_URL;

function ChatWindow({ chat, currentUser }) {
  const [messages, setMessages] = useState([]);

  // Fetch messages between selected users
  useEffect(() => {
    if (!chat || !currentUser) return;

    const fetchMessages = async () => {
      try {
        const res = await fetch(`https://whatsapp-clone-vcn6.onrender.com/api/messages/...`);
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      }
    };

    fetchMessages();
  }, [chat, currentUser]);

  // Real-time incoming messages
  useEffect(() => {
    const handleNewMessage = (message) => {
      if (
        (message.from === currentUser && message.to === chat.id) ||
        (message.from === chat.id && message.to === currentUser)
      ) {
        setMessages((prev) => [...prev, message]);
      }
    };

    socket.on("new_message", handleNewMessage);
    return () => socket.off("new_message", handleNewMessage);
  }, [chat, currentUser]);

  if (!chat) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        Select a chat to start messaging
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full">
      <div className="p-4 border-b border-gray-700 bg-gray-800 font-bold">
        {chat.name}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-900 text-white">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded max-w-sm ${
              msg.from === currentUser ? "bg-green-600 ml-auto" : "bg-gray-700"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      <MessageInput from={currentUser} to={chat.id} />
    </div>
  );
}

export default ChatWindow;

