import { useState } from "react";

function MessageInput({ from, to }) {
  const [text, setText] = useState("");

  const sendMessage = async () => {
    if (!text.trim()) return;

    await fetch("http://localhost:5000/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ from, to, content: text })
    });

    setText("");
  };

  return (
    <div className="flex p-2 bg-gray-800 border-t border-gray-700">
      <input
        className="flex-1 p-2 rounded bg-gray-700 text-white"
        placeholder="Type your message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="bg-green-500 text-white px-4 ml-2 rounded"
        onClick={sendMessage}
      >
        Send
      </button>
    </div>
  );
}

export default MessageInput;
