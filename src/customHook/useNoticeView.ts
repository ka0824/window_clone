import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { NoticeType } from "../types";

/**
 * 게시판 글의 정보를 관리하는 커스텀 훅입니다.
 * 문서의 id를 인자로 받아, 파이어 베이스에서 데이터를 받아옵니다.
 * 데이터가 변경될 때마다, 실시간으로 값을 업데이트 합니다.
 * @param id - 문서의 id
 * @returns {object} - 게시판 글의 정보를 담은 객체
 */

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
