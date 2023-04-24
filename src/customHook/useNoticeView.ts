import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { NoticeType } from "../types";

function useNoticeView(id: string) {
  const [noticeView, setNoticeView] = useState<NoticeType>({
    title: "",
    content: "",
    comment: [],
    writer: "",
  });

  useEffect(() => {
    const target = doc(db, "notice", id);
    const unsubscribe = onSnapshot(target, (doc) => {
      const data = doc.data() as NoticeType;
      setNoticeView(data);
    });

    return () => {
      unsubscribe();
    };
  }, [id]);

  return noticeView;
}

export default useNoticeView;
