import { useAppContext } from "../context/AppContext";
import { useState, useEffect } from "react";
import Message from "./Message";
import React from "react";
import toast from "react-hot-toast";



function Chatbox() {

  const containerRef = React.useRef(null);

  const {selectedChat, theme, user, axios, token, setUser, setSelectedChat} = useAppContext();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [prompt, setPrompt] = useState("");
  const [mode, setMode] = useState('text');
  const [isPublished, setIsPublished] = useState(false);

  const onSubmit = async(e) => {
    try {
      e.preventDefault();
      if(prompt.trim() === "") return toast('Plese enter a valid prompt!');
      if(!user) return toast('Login to start a chat!');
      setLoading(true);
      const promptCopy = prompt;
      setPrompt('');
      setMessages(prev => [...prev, {role: 'user', content: prompt, timestamp: Date.now(), isImage: false}]);

      const {data} = await axios.post(`/api/message/${mode}`, {chatId: selectedChat._id, prompt, isPublished}, {headers: {Authorization: token}});

      if (data.success) {
        setMessages(data.updatedChat.messages); // full sync with DB
        setSelectedChat(data.updatedChat);
        setUser(prev => ({ ...prev, credits: data.updatedUser.credits }));
      }
      else{
        toast.error(data.message);
        setPrompt(promptCopy);
      }
    } catch (error){
      toast.error(error.message);
    }finally{
      setPrompt('');
      setLoading(false);
    }
    
  };

  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.messages);
    }
  }, [selectedChat]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
      
    }
  }, [messages, loading]);

  return (
    <div className="chatbox flex-1 flex flex-col justify-between bg-white dark:bg-gray-900 text-black dark:text-white p-4">
      
      {/* chat messages  */}
      <div ref={containerRef} className="flex-1 overflow-y-auto mb-4">
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full">

        <p className="text-center text-gray-500 dark:text-gray-400 mt-10">
          No messages yet. Start the conversation! </p>
          <img className="w-1/2 h-1/2 mt-4 opacity-50" src="./images/NovaIconWbg.png" alt="Chat Illustration" />
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
      <form onSubmit={onSubmit} className="flex items-center border-t border-gray-300 dark:border-gray-700 pt-4">
        <select onChange={(e) => setMode(e.target.value)} value={mode} className="text-sm pl-3 pr-2" name="" id="">
          <option className="dark:bg-purple-900" value="text">Text</option>
          <option className="dark:bg-purple-900" value="image">Image</option>
        </select>
        <input onChange={(e) => setPrompt(e.target.value)} value={prompt} type="text" placeholder="Type your prompt here" className="flex-1 w-full text-sm outline-none" required />
        <button 
          disabled={loading} 
          type="submit" 
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-2 px-4 rounded ml-2 text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send
        </button>

      </form>

    </div>
  );
}

export default Chatbox