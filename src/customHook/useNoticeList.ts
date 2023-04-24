import { collection, onSnapshot, query } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { NoticeType } from "../types";

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
