import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import moment from 'moment/moment';



function Sidebar() {


    const { chats, setSelectedChats, theme, setTheme, user } = useAppContext();

    const [search, setSearch] = useState('');

  return (
    <div className="sidebar flex flex-col items-center bg-gradient-200 dark:bg-gradient-to-b from-[#3a383e] to-[#1f1e21] text-black dark:text-white border-r border-gray-300 dark:border-gray-700 backdrop-blur-3xl tansition-all duration-300 p-4 w-1/4">
      {/* logo */}
      <img className='w-75 h-25' src="./images/NovaLogo.png" alt="" />
      
      {/* newChat button  */}
      <button  className='flex items-center justify-center w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-2 px-4 rounded mb-4 transition-all duration-300'>
        <span className='mr-2 text-xl' >+</span>New Chat
      </button>

      {/* search convo */}
      <div className='w-full'>
        <input 
            type="text" 
            placeholder='Search Conversations...' 
            className='w-full p-2 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* recent chats  */}
        {chats.length > 0 && <p className='mt-4 text-sm'>Recent Chats</p>}
        <div className='flex flex-col space-y-2 mt-2 w-full overflow-y-auto'>
            {
                chats.filter(chat => chat.messages[0] ? chat.messages[0]?.content.toLowerCase().includes(search.toLowerCase()) : chat.name.toLowerCase().includes(search.toLowerCase())).map((chat) => (
                    <div 
                        key={chat.id}
                        className='p-2 bg-gray-300 dark:bg-gray-800 rounded cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-700 transition-all duration-300'>
                        <div>
                            <p className='font-bold truncate w-full'>
                                {chat.messages.length > 0 ? chat.messages[0].content.slice(0, 32) : chat.name }
                            </p>
                            <p className='text-xs text-gray-500 dark:text-gray-400'>
                                {moment(chat.updatedAt).fromNow()}
                            </p>
                        </div>
                        {/* onClick={() => setSelectedChats(chat)} */}
                    {/* > */}
                        {/* {chat.messages[0] ? chat.messages[0]?.content.slice(0, 20) + (chat.messages[0]?.content.length > 20 ? '...' : '') : 'New Chat'} */}
                        <span className='hidden group-hover:block w-4 cursor-pointer not-dark:invert'>delete</span>
                    </div>
                ))
            }
        </div>
      {/* <h2>Sidebar</h2> */}
    </div>
  )
}

export default Sidebar