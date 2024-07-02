import React from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { formatTimestamp } from "../utils"; // Adjust this import based on your actual timestamp formatting function

const Message = ({ message, prevTimestamp }) => {
  const [user] = useAuthState(auth);

  const getFirstName = (fullName) => {
    return fullName.split(' ')[0]; // Split the full name by spaces and return the first part
  };

  const isNewDay = (currentTimestamp, previousTimestamp) => {
    const currentDate = new Date(currentTimestamp.seconds * 1000);
    const previousDate = new Date(previousTimestamp.seconds * 1000);
    return (
      currentDate.getFullYear() !== previousDate.getFullYear() ||
      currentDate.getMonth() !== previousDate.getMonth() ||
      currentDate.getDate() !== previousDate.getDate()
    );
  };

  return (
    <div>
      {prevTimestamp && isNewDay(message.createdAt, prevTimestamp) && (
        <hr className="new-day-separator" />
      )}
      <div className={`chat-bubble ${message.uid === user.uid ? "right" : ""}`}>
        <img
          className="chat-bubble__left"
          src={message.avatar}
          alt="user avatar"
        />
        <div className="chat-bubble__right">
          <p className="user-name">
            {getFirstName(message.name)}{" "}
            <span className="text-gray-400 ml-1 font-medium text-sm message-timestamp">
              {formatTimestamp(message.createdAt)}
            </span>
          </p>
          <p className="user-message">{message.text}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
