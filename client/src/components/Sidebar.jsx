import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import moment from "moment/moment";
import {BinIcon} from '../assets/assets';
// import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


function Sidebar({}) {
  const { chats, setSelectedChat, theme, setTheme, user, createNewChat, axios, setChats, fetchUserChats, token, setToken} = useAppContext();

  const [search, setSearch] = useState("");

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    toast.success("Logged out successfully");
  }

  const deleteChat = async (e, chatId) => {
    try {
      e.stopPropagation();
      const confirm = window.confirm("Are you sure! you want to delete this chat?");
      if(!confirm) return 
      const { data } = await axios.post('/api/chat/delete', {chatId}, {headers: {Authorization: token }});
      if(data.success){
        setChats(prev => prev.filter(chat => chat._id !== chatId));
        await fetchUserChats();
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const navigate = useNavigate();

  return (
    <div className="sidebar flex flex-col bg-white dark:bg-[#1f1e21] text-black dark:text-white border-r border-gray-300 dark:border-gray-700 backdrop-blur-xl transition-all duration-300 p-4 w-72 h-screen">
      {/* logo */}
      <div className="flex justify-center mb-4">
      <img className="w-52" src="./images/NovaLogo.png" alt="" />
      </div>

      {/* newChat button  */}
      <button onClick={createNewChat} className="flex items-center justify-center w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-2 px-4 rounded-lg mb-4 transition-all duration-300 shadow-md">
        <span className="mr-2 text-xl">+</span>New Chat
      </button>

      {/* search convo */}
      <div className="w-full">
        <input
          type="text"
          placeholder="Search Conversations..."
          className="w-full p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-black dark:text-white mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* recent chats  */}
      {chats.length > 0 && <p className="text-sm text-gray-500 dark:text-gray-400">Recent Chats</p>}
      <div className="flex flex-col space-y-2 mt-2 w-full overflow-y-auto flex-1">
        {chats
          .filter((chat) =>
            chat.messages[0]
              ? chat.messages[0]?.content
                  .toLowerCase()
                  .includes(search.toLowerCase())
              : chat.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((chat) => (
            <div
              key={chat.id}
              // onClick={() => setSelectedChat(chat)} 
              className="group relative p-3 bg-gray-100 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
              onClick={() => setSelectedChat(chat)}
            >
              <div>
                <p className="font-semibold truncate">
                  {chat.messages.length > 0
                    ? chat.messages[0].content.slice(0, 32)
                    : chat.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {moment(chat.updatedAt).fromNow()}
                </p>
              </div>
              {/* onClick={() => setSelectedChats(chat)} */}
              {/* > */}
              {/* {chat.messages[0] ? chat.messages[0]?.content.slice(0, 20) + (chat.messages[0]?.content.length > 20 ? '...' : '') : 'New Chat'} */}
              <img
                className="hidden group-hover:block absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 cursor-pointer opacity-70 hover:opacity-100 transition"
                src="/images/deleteIcon.png"
                alt="delete"
                onClick={(e) => {
                  toast.promise(deleteChat(e, chat._id), {loading: 'deleting...'})
                }}
              />
              {/* <img
                className="hidden group-hover:block absolute right-3 top-3 w-4 cursor-pointer invert dark:invert-0"
                src='./images/deleteIcong.png'
                alt="delete"
                onClick={(e) => {
                    e.stopPropagation();
                    // call your delete function here
                    console.log("Delete chat with id:", chat.id);
                }}
              /> */}
              {/* <BinIcon className='hidden group-hover:block absolute right-2 top-2 w-4 cursor-pointer invert dark:invert-0' />  */}
            </div>
          ))}
      </div>

      {/* Credit purchase option  */}
      <div
        onClick={() => navigate("/credits")}
        className="mt-4 w-full p-3 bg-gradient-to-r from-blue-400 to-purple-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold rounded-lg cursor-pointer text-center transition-all duration-300 shadow-md"
      >
        {/* <img src='' alt="" /> */}
        <div className="flex flex-col mb-2">
          <p>Credits: {user ? user.credits : 0}</p>
          <p className="text-xs opacity-80">Click to buy more</p>
        </div>
      </div>

      {/* dark mode toggle  */}
      <div className="flex items-center justify-between gap-2 p-3 mt-4 border-t border-gray-300 dark:border-gray-700 w-full">
        <div className="flex items-centre gap-2 text-sm" >
          <p>Dark Mode</p>
        </div>
        <label className="relative inline-flex cursor-pointer items-center" >
            <input onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="sr-only peer" type="checkbox" checked={theme === 'dark'} />
           <div className="w-10 h-5 bg-gray-400 rounded-full peer-checked:bg-purple-600 transition-all duration-300"></div>
            
           {/* </div> */}
           <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-5" ></span>
        </label>

      </div>


      {/* user account  */}
      <div className="flex items-center justify-between gap-3 p-3 mt-4 border-t border-gray-300 dark:border-gray-700 w-full">
        <div className="flex items-center gap-3">
          <img className="w-10 h-10 rounded-full" src="./images/user.png" alt="user" />
          <div className="flex flex-col">
            <p className="font-bold text-sm">{user ? user.name : 'Guest'}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{user ? user.email : 'Not logged in'}</p>
          </div>
        </div>

        {/* Logout Icon */}
        {user && (
          <img
            className="w-5 h-5 cursor-pointer invert dark:invert-0"
            src="./images/logoutIcon.png"
            alt="logout"
            onClick={logout}
          />
        )}
      </div>





      {/* <h2>Sidebar</h2> */}
    </div>
  );
}

export default Sidebar;




// import React, { useState } from "react";
// import { useAppContext } from "../context/AppContext";
// import moment from "moment/moment";
// import BinIcon from "../assets/BinIcon.svg";
// import { useNavigate } from "react-router-dom";

// function Sidebar() {
//   const { chats, setSelectedChat, theme, setTheme, user } = useAppContext();
//   const [search, setSearch] = useState("");
//   const navigate = useNavigate();

//   return (
//     <div className="sidebar flex flex-col bg-white dark:bg-[#1f1e21] text-black dark:text-white border-r border-gray-300 dark:border-gray-700 backdrop-blur-xl transition-all duration-300 p-4 w-72 h-screen">
      
//       {/* Logo */}
//       <div className="flex justify-center mb-4">
//         <img className="w-32" src="./images/NovaLogo.png" alt="Nova Logo" />
//       </div>

//       {/* New Chat */}
//       <button className="flex items-center justify-center w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-2 px-4 rounded-lg mb-4 transition-all duration-300 shadow-md">
//         <span className="mr-2 text-xl">+</span> New Chat
//       </button>

//       {/* Search Bar */}
//       <input
//         type="text"
//         placeholder="Search Conversations..."
//         className="w-full p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-black dark:text-white mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       {/* Recent Chats */}
//       {chats.length > 0 && <p className="text-sm text-gray-500 dark:text-gray-400">Recent Chats</p>}
//       <div className="flex flex-col space-y-2 mt-2 w-full overflow-y-auto flex-1">
//         {chats
//           .filter((chat) =>
//             chat.messages[0]
//               ? chat.messages[0]?.content.toLowerCase().includes(search.toLowerCase())
//               : chat.name.toLowerCase().includes(search.toLowerCase())
//           )
//           .map((chat) => (
//             <div
//               key={chat.id}
//               onClick={() => setSelectedChat(chat)}
//               className="group relative p-3 bg-gray-100 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
//             >
//               <div>
//                 <p className="font-semibold truncate">
//                   {chat.messages.length > 0
//                     ? chat.messages[0].content.slice(0, 32)
//                     : chat.name}
//                 </p>
//                 <p className="text-xs text-gray-500 dark:text-gray-400">
//                   {moment(chat.updatedAt).fromNow()}
//                 </p>
//               </div>
//               <img
//                 className="hidden group-hover:block absolute right-3 top-3 w-4 cursor-pointer invert dark:invert-0"
//                 src={BinIcon}
//                 alt="delete"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   console.log("Delete chat with id:", chat.id);
//                 }}
//               />
//             </div>
//           ))}
//       </div>

//       {/* Credits */}
//       <div
//         onClick={() => navigate("/credits")}
//         className="mt-4 w-full p-3 bg-gradient-to-r from-blue-400 to-purple-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold rounded-lg cursor-pointer text-center transition-all duration-300 shadow-md"
//       >
//         <p>Credits: {user ? user.credits : 0}</p>
//         <p className="text-xs opacity-80">Click to buy more</p>
//       </div>

//       {/* Dark Mode */}
//       <div className="flex items-center justify-between gap-2 p-3 mt-4 border-t border-gray-300 dark:border-gray-700 w-full">
//         <p className="text-sm">Dark Mode</p>
//         <label className="relative inline-flex cursor-pointer items-center">
//           <input
//             onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
//             type="checkbox"
//             className="sr-only peer"
//             checked={theme === "dark"}
//           />
//           <div className="w-10 h-5 bg-gray-400 rounded-full peer-checked:bg-purple-600 transition-all duration-300"></div>
//           <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-5"></span>
//         </label>
//       </div>

//       {/* User Info */}
//       <div className="flex items-center gap-3 p-3 mt-4 border-t border-gray-300 dark:border-gray-700 w-full">
//         <img className="w-10 h-10 rounded-full" src="./images/user.png" alt="user" />
//         <div className="flex flex-col">
//           <p className="font-bold text-sm">{user ? user.name : "Guest"}</p>
//           <p className="text-xs text-gray-500 dark:text-gray-400">
//             {user ? user.email : "Not logged in"}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Sidebar;
