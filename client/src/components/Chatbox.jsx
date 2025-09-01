import { useAppContext } from "../context/AppContext";
import { useState, useEffect } from "react";
import Message from "./Message";


function Chatbox() {

  const {selectedChat, theme} = useAppContext();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.messages);
    }
  }, [selectedChat]);

  return (
    <div className="chatbox flex-1 flex flex-col justify-between bg-white dark:bg-gray-900 text-black dark:text-white p-4">
      
      {/* chat messages  */}
      <div className="flex-1 overflow-y-auto mb-4">
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full">

        <p className="text-center text-gray-500 dark:text-gray-400 mt-10">
          No messages yet. Start the conversation! </p>
          <img className="w-1/2 h-1/2 mt-4" src="./images/NovaIcon.png" alt="Chat Illustration" />
        </div>
      )}

      {messages.map((message, index) => (
        <Message key={index} message={message} />
      ))}

      {/* three dots loading  */}
      {loading && (
        <div className="loader flex items.center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce"></div>
        </div>
      )}
       
      </div>

      {/* input box  */}
      <form>
        <select className="text-sm pl-3 pr-2" name="" id="">
          <option className="dark:bg-purple-900" value="text">Text</option>
          <option className="dark:bg-purple-900" value="image">Image</option>
        </select>

      </form>

    </div>
  );
}

export default Chatbox