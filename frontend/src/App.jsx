import { useEffect, useState } from "react";
import io from "socket.io-client";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";

const socket = io("http://localhost:5000");

const USERS = [
  { id: "aslam", name: "Aslam" },
  { id: "olivia", name: "Olivia" },
  { id: "shyam", name: "Shyam" }
];

function App() {
  const [currentUser, setCurrentUser] = useState("aslam");
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("new_message", (msg) => {
      if (
        (msg.from === currentUser && msg.to === selectedChat?.id) ||
        (msg.to === currentUser && msg.from === selectedChat?.id)
      ) {
        setMessages(prev => [...prev, msg]);
      }
    });

    return () => {
      socket.off("new_message");
    };
  }, [selectedChat, currentUser]);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar
        users={USERS.filter(u => u.id !== currentUser)}
        onSelectChat={setSelectedChat}
        selected={selectedChat}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
      <div className="flex-1 border-l border-gray-700">
        {selectedChat ? (
          <ChatWindow
            currentUser={currentUser}
            chat={selectedChat}
            messages={messages}
            setMessages={setMessages}
            socket={socket}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            Select a chat to start messaging.
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
