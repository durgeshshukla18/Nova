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
        <div className=" flex items-start justify-end  mb-4 p-3 rounded-lg max-w-xl bg-blue-500 text-white self-end">
          <div className="flex flex-col gap-2 p-2 px-4 rounded-lg bg-blue-500 text-white">
            <p className="text-sm dark:text-primary">{message.content}</p>
            <span className="text-xs text-gray-400">
              {moment(message.timestamp).fromNow()}
            </span>
          </div>
          <img
            src="./images/user.png"
            alt="user"
            className="w-8 rounded-full"
          />
        </div>
      ) : (
        <div className="mb-4 p-3 rounded-lg max-w-xl bg-gray-200 dark:bg-gray-800 text-black dark:text-white self-start">
          <div className="flex flex-col gap-2 p-2 px-4 rounded-lg bg-gray-200 dark:bg-gray-800 text-black dark:text-white">
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
            <span className="text-xs text-gray-400">
              {moment(message.timestamp).fromNow()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Message;
