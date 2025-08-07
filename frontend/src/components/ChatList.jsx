import React from 'react';

const Sidebar = ({ chats, setActiveChat, activeChat }) => {
  return (
    <div className="w-1/3 h-full bg-gray-100 border-r overflow-y-auto">
      <h2 className="text-xl font-semibold p-4 border-b">Chats</h2>
      {chats.map(chat => (
        <div
          key={chat.wa_id}
          className={`p-4 border-b cursor-pointer ${
            activeChat?.wa_id === chat.wa_id ? 'bg-green-100' : 'hover:bg-gray-200'
          }`}
          onClick={() => setActiveChat(chat)}
        >
          <div className="font-bold">{chat.name || 'Unnamed'}</div>
          <div className="text-sm text-gray-600">{chat.wa_id}</div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
