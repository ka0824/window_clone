import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { ChatList, ChatType } from "../types";
import { collection, onSnapshot, query, where } from "firebase/firestore";

/**
 * firestore의 'chat' collection에서 현재 사용자가 참여한 채팅창 정보를 가져오는 커스텀 훅 입니다.
 * @returns {ChatList} 가져온 채팅방 정보 목록
 */

function useChatList() {
  const [chatList, setChatList] = useState<ChatList>([]);

  useEffect(() => {
    const queryTarget = query(
      collection(db, "chat"),
      where("chatter", ">=", localStorage.getItem("nickname")),
      where("chatter", "<=", localStorage.getItem("nickname") + "\uf8ff")
    );
    const unsubscribe = onSnapshot(queryTarget, (snapshot) => {
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
