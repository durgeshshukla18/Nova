import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import moment from "moment/moment";
// import {BinIcon} from '../assets/assets';
import BinIcon from "../assets/BinIcon.svg";
import { useNavigate } from "react-router-dom";


function Sidebar({}) {
  const { chats, setSelectedChat, theme, setTheme, user } = useAppContext();

  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  return (
    <div className="sidebar flex flex-col items-center bg-gradient-200 dark:bg-gradient-to-b from-[#3a383e] to-[#1f1e21] text-black dark:text-white border-r border-gray-300 dark:border-gray-700 backdrop-blur-3xl tansition-all duration-300 p-4 w-1/4">
      {/* logo */}
      <img className="w-75 h-25" src="./images/NovaLogo.png" alt="" />

      {/* newChat button  */}
      <button className="flex items-center justify-center w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-2 px-4 rounded mb-4 transition-all duration-300">
        <span className="mr-2 text-xl">+</span>New Chat
      </button>

      {/* search convo */}
      <div className="w-full">
        <input
          type="text"
          placeholder="Search Conversations..."
          className="w-full p-2 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* recent chats  */}
      {chats.length > 0 && <p className="mt-4 text-sm">Recent Chats</p>}
      <div className="flex flex-col space-y-2 mt-2 w-full overflow-y-auto">
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
              className="group relative p-2 bg-gray-300 dark:bg-gray-800 rounded cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-700 transition-all duration-300"
              onClick={() => setSelectedChat(chat)}
            >
              <div>
                <p className="font-bold truncate w-full">
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
                className="hidden group-hover:block absolute right-2 top-2 w-4 cursor-pointer invert dark:invert-0"
                src={BinIcon}
                alt="delete"
                onClick={(e) => {
                    e.stopPropagation();
                    // call your delete function here
                    console.log("Delete chat with id:", chat.id);
                }}
              />
              {/* <BinIcon className='hidden group-hover:block absolute right-2 top-2 w-4 cursor-pointer invert dark:invert-0' />  */}
            </div>
          ))}
      </div>

      {/* Credit purchase option  */}
      <div
        onClick={() => navigate("/credits")}
        className="mt-auto w-full p-2 bg-gradient-to-r from-blue-400 to-purple-500 hover:from-red-500 hover:to-yellow-400 text-white font-bold rounded cursor-pointer text-center transition-all duration-300"
      >
        {/* <img src='' alt="" /> */}
        <div className="flex flex-col mb-2">
          <p>Credits: {user ? user.credits : 0}</p>
          <p className="text-xs text-gray-700">Click to buy more</p>
        </div>
      </div>

      {/* dark mode toggle  */}
      <div className="flex item-centre justify-between gap-2 p-3 mt-4 border-t border-gray-300 dark:border-gray-700 w-full rounded">
        <div className="flex items-centre gap-2 text-sm" >
          <p>Dark Mode</p>
        </div>
        <label className="relative inline-flex cursor-pointer" >
            <input onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="sr-only peer" type="checkbox" checked={theme === 'dark'} />
           <div className="w-9 h-5 bg-gray-400 rounded-full peer-checked:bg-purple-600 transition-all duration-300 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800"></div>
            
           {/* </div> */}
           <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-4" ></span>
        </label>

      </div>


      {/* user account  */}
        <div className="flex items-center gap-2 p-3 mt-4 border-t border-gray-300 dark:border-gray-700 w-full rounded">
            <img className="w-8 h-8 rounded-full" src="./images/user.png" alt="user" />
            <div className="flex flex-col">
                <p className="font-bold text-sm">{user ? user.name : 'Guest'}</p>
                <p className="text-xs text-gray-700 dark:text-gray-400">{user ? user.email : 'Not logged in'}</p>
                {/* {user && <img className="w-4 h-4 mt-1 cursor-pointer invert dark:invert-0" src='../images/logout.png' alt="" />} */}
            </div>

            <img className="absolute top-3 right-3 w-5 h-5 cursor-pointer md:hidden not-dark:inverted" src="../images/user.png" alt="" />
        </div>




      {/* <h2>Sidebar</h2> */}
    </div>
  );
}

export default Sidebar;
