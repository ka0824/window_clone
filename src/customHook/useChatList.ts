import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { ChatList, ChatType } from "../types";
import { collection, onSnapshot, query, where } from "firebase/firestore";

function useChatList() {
  const [chatList, setChatList] = useState<ChatList>([]);

  useEffect(() => {
    const target = query(
      collection(db, "chat"),
      where("chatter", ">=", localStorage.getItem("nickname")),
      where("chatter", "<=", localStorage.getItem("nickname") + "\uf8ff")
    );
    const unsubscribe = onSnapshot(target, (snapshot) => {
      const result: ChatList = [];
      snapshot.forEach((doc) => {
        const data = doc.data() as ChatType;
        result.push(data);
      });

      setChatList(result);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return chatList;
}

export default useChatList;
