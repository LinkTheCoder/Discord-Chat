import React from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { formatTimestamp } from "../utils"; // Adjust this import based on your actual timestamp formatting function

const Message = ({ message, prevTimestamp }) => {
  const [user, loading] = useAuthState(auth);

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle cases where message or prevTimestamp is not yet available
  if (!user || !message || !message.createdAt) {
    return <div>Loading message...</div>;
  }

  // Ensure the message createdAt timestamp is valid
  if (typeof message.createdAt.seconds !== 'number') {
    return <div>Invalid message timestamp</div>;
  }

  // Handle cases where prevTimestamp is not yet available
  if (prevTimestamp && typeof prevTimestamp.seconds !== 'number') {
    return <div>Invalid previous timestamp</div>;
  }

  const isNewDay = (currentTimestamp, previousTimestamp) => {
    if (!currentTimestamp || !previousTimestamp) {
      return false; // Assume not a new day if timestamps are missing
    }

    const currentDate = new Date(currentTimestamp.seconds * 1000);
    const previousDate = new Date(previousTimestamp.seconds * 1000);

    return (
      currentDate.getFullYear() !== previousDate.getFullYear() ||
      currentDate.getMonth() !== previousDate.getMonth() ||
      currentDate.getDate() !== previousDate.getDate()
    );
  };

  const getFirstName = (fullName) => {
    return fullName ? fullName.split(' ')[0] : 'Unknown'; // Default to 'Unknown' if fullName is missing
  };

  return (
    <div>
      {prevTimestamp && isNewDay(message.createdAt, prevTimestamp) && (
        <hr className="new-day-separator" />
      )}
      <div className={`chat-bubble ${message.uid === user.uid ? "right" : ""}`}>
        <img
          className="chat-bubble__left"
          src={message.avatar || 'default-avatar-url'} // Provide a default avatar if missing
          alt="user avatar"
        />
        <div className="chat-bubble__right">
          <p className="user-name">
            {getFirstName(message.name)}{" "}
            <span className="text-gray-400 ml-1 font-medium text-sm message-timestamp">
              {formatTimestamp(message.createdAt)}
            </span>
          </p>
          <p className="user-message">{message.text || 'No message'}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
