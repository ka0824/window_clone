import { collection, onSnapshot, query } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { NoticeType } from "../types";

/**
 * 게시판에 작성된 글 목록을 관리하는 커스텀 훅입니다.
 * 파이어 베이스와 연결하여 데이터가 변경될 때마다 값을 업데이트 합니다.
 * @returns {array} 작성된 글 목록
 */

function useNoticeList() {
  const [noticeList, setNoticeList] = useState<NoticeType[]>([]);

  useEffect(() => {
    const target = query(collection(db, "notice"));

    const unsubscribe = onSnapshot(target, (snapshot) => {
      const result: NoticeType[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data() as NoticeType;

        result.push({ ...data, id: doc.id });
      });
      setNoticeList(result);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return noticeList;
}

export default useNoticeList;
