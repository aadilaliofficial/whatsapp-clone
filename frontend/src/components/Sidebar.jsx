function Sidebar({ users, onSelectChat, selected, currentUser, setCurrentUser }) {
  return (
    <div className="w-64 bg-gray-800 border-r border-gray-700 p-2 flex flex-col">
      <div className="mb-4">
        <label className="block mb-1 text-sm">Select User:</label>
        <select
          value={currentUser}
          onChange={e => setCurrentUser(e.target.value)}
          className="w-full p-2 bg-gray-700 text-white rounded"
        >
          <option value="aslam">Aslam</option>
          <option value="olivia">Olivia</option>
          <option value="shyam">Shyam</option>
        </select>
      </div>
      <div className="flex-1 overflow-y-auto space-y-1">
        {users.map(user => (
          <div
            key={user.id}
            onClick={() => onSelectChat(user)}
            className={`p-2 rounded cursor-pointer hover:bg-gray-700 ${
              selected?.id === user.id ? "bg-gray-700" : ""
            }`}
          >
            {user.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
