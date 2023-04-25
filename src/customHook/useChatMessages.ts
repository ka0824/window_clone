import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";

/**
 * firestore의 'chat' collection에서 현재 사용자가 참여한 채팅방의 정보를 가져오는 커스텀 훅입니다.
 * @returns {{chatMessages, dataId}} 가져온 채팅방의 채팅 목록과 해당 채팅방 정보를 가진 문서의 id
 */

function useChatMessages(chatWith: string) {
  const [chatMessages, setChatMessages] = useState([]);
  const [dataId, setDataId] = useState("");

  useEffect(() => {
    const queryTarget = query(
      collection(db, "chat"),
      where("chatter", "in", [
        `${localStorage.getItem("nickname")}_${chatWith}`,
        `${chatWith}_${localStorage.getItem("nickname")}`,
      ])
    );
    const unsubscribe = onSnapshot(queryTarget, (snapshot) => {
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
