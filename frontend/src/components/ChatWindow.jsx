import { useEffect, useState } from "react";
import socket from "../socket";
import MessageInput from "./MessageInput";

function ChatWindow({ chat, currentUser }) {
  const [messages, setMessages] = useState([]);

  // Fetch chat messages when `chat` changes
  useEffect(() => {
    if (!chat || !currentUser) return;

    fetch(`http://localhost:5000/api/messages/${currentUser}/${chat.id}`)
      .then(res => res.json())
      .then(data => setMessages(data));
  }, [chat, currentUser]);

  // Receive new message in real-time
  useEffect(() => {
    socket.on("new_message", (message) => {
      if (
        (message.from === currentUser && message.to === chat.id) ||
        (message.from === chat.id && message.to === currentUser)
      ) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => socket.off("new_message");
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
      <div className="p-4 border-b border-gray-700 bg-gray-800 font-bold">{chat.name}</div>

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
