import React, { useEffect } from "react";
import moment from "moment/moment";
import Markdown from "react-markdown";
import prism from "prismjs";


function Message({ message }) {


    useEffect(() => {
        prism.highlightAll();
      }, [message.content]);

  return (
    <div>
      {message.role === "user" ? (
        <div className=" flex items-end justify-end mb-4">
          <div className="max-w-xs sm:max-w-md bg-blue-500 text-white px-4 py-2 rounded-2xl shadow-md rounded-br-none">
            <p className="text-sm dark:text-primary">{message.content}</p>
            <span className="text-xs text-blue-200 block mt-1 text-right">
              {moment(message.timestamp).fromNow()}
            </span>
          </div>
          <img
            src="./images/user.png"
            alt="user"
            className="w-8 rounded-full ml-2"
          />
        </div>
      ) : (
        <div className="flex items-start justify-start mb-4">
          <img
            src="./images/chatbot.png"
            alt="chatbot"
            className="w-8 h-8 rounded-full mr-2"
          />
          <div className="max-w-xs sm:max-w-md bg-gray-200 dark:bg-gray-800 text-black dark:text-white px-4 py-2 rounded-2xl shadow-md rounded-bl-none">
            <div className="text-sm dark:text-primary">
              {/* Render image if AI generated one */}
              {message.isImage ? (
                <img
                  src={message.content}
                  alt="AI generated"
                  className="rounded-lg max-w-xs h-auto cursor-pointer"
                  onClick={() => window.open(message.content, "_blank")}
                />
              ) : (
                <Markdown>{message.content}</Markdown>
              )}
            </div>
            <span className="text-xs text-gray-400 dark:text-gray-500 block mt-1">
              {moment(message.timestamp).fromNow()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Message;
