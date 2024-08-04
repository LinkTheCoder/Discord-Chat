import React, { useEffect, useRef, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { db } from "../firebase";
import Message from "./Message";
import SendMessage from "./SendMessage";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const scroll = useRef();

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt", "desc"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages = [];
      QuerySnapshot.forEach((doc) => {
        const data = doc.data();
        // Ensure each message has a valid createdAt timestamp
        if (data.createdAt && typeof data.createdAt.seconds === 'number') {
          fetchedMessages.push({ ...data, id: doc.id });
        }
      });
      // Sort messages by createdAt if valid
      const sortedMessages = fetchedMessages.sort(
        (a, b) => a.createdAt.seconds - b.createdAt.seconds
      );
      setMessages(sortedMessages);
    });

    return () => unsubscribe();
  }, []);

  return (
    <main className="chat-box mt-14">
      <div className="messages-wrapper">
        {messages.map((message, index) => (
          <Message 
            key={message.id} 
            message={message} 
            prevTimestamp={index > 0 ? messages[index - 1].createdAt : null} 
          />
        ))}
      </div>
      <span ref={scroll}></span>
      <SendMessage scroll={scroll} />
    </main>
  );
};

export default ChatBox;
