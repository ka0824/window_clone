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
    const nickname = localStorage.getItem("nickname");
    const start = nickname;
    const end = nickname + "\uf8ff";

    const query1 = query(
      collection(db, "chat"),
      where("chatter", ">=", localStorage.getItem("nickname"))
    );

    const query2 = query(
      collection(db, "chat"),
      where("chatter", "<=", localStorage.getItem("nickname") + "\uf8ff")
    );

    const unsubscribe1 = onSnapshot(query1, (snapshot) => {
      const result: any = [];
      snapshot.forEach((doc) => result.push(doc.data()));
      setChatList((prevList) => [...prevList, ...result]);
    });

    const unsubscribe2 = onSnapshot(query2, (snapshot) => {
      const result: any = [];
      snapshot.forEach((doc) => result.push(doc.data()));
      setChatList((prevList) => [...prevList, ...result]);
    });

    return () => {
      unsubscribe1();
      unsubscribe2();
    };
  }, []);

  return chatList;
}

export default useChatList;
