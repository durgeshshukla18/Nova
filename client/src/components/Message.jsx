import React from 'react'
import moment from 'moment/moment'


function Message({message}) {
  return (
    <div>
      {message.role === 'user' ? (
        <div className=" flex items-start justify-end  mb-4 p-3 rounded-lg max-w-xl bg-blue-500 text-white self-end">
          <div className="flex flex-col gap-2 p-2 px-4 rounded-lg bg-blue-500 text-white">
          <p className="text-sm dark:text-primary" >{message.content}</p>
          <span className="text-xs text-gray-400" >{message.timestamp}</span>
          </div>
          <img src="./images/yser.png" alt="user" className="w-8 rounded-full" />
        </div>
      ) : (
        <div className="mb-4 p-3 rounded-lg max-w-xl bg-gray-200 dark:bg-gray-800 text-black dark:text-white self-start">
          <div className="flex flex-col gap-2 p-2 px-4 rounded-lg bg-gray-200 dark:bg-gray-800 text-black dark:text-white">
          <p className="text-sm dark:text-primary">{message.content}</p>
          <span className="text-xs text-gray-400" >{message.timestamp}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Message