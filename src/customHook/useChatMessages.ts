import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";

function useChatMessages(chatWith: string) {
  const [chatMessages, setChatMessages] = useState([]);
  const [dataId, setDataId] = useState("");

  useEffect(() => {
    const target = query(
      collection(db, "chat"),
      where("chatter", "in", [
        `${localStorage.getItem("nickname")}_${chatWith}`,
        `${chatWith}_${localStorage.getItem("nickname")}`,
      ])
    );
    const unsubscribe = onSnapshot(target, (snapshot) => {
      snapshot.forEach((doc) => {
        const data = doc.data();
        setChatMessages(data.messages);
        setDataId(doc.id);
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return { chatMessages, dataId };
}

export default useChatMessages;
