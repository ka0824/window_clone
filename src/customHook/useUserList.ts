import { collection, onSnapshot, query } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { UserInfo } from "../types";

/**
 * 현재 데이터베이스에 등록된 회원들의 닉네임을 가져오는 커스텀 훅 입니다.
 * @returns {userList} 현재 데이터 베이스에 등록된 회원들의 정보를 담은 배열
 */

function useUserList() {
  const [userList, setUserList] = useState<UserInfo[]>([]);

  useEffect(() => {
    const target = query(collection(db, "users"));
    const unsubscribe = onSnapshot(target, (snapshot) => {
      const result: UserInfo[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data() as UserInfo;

        if (data.nickname !== localStorage.getItem("nickname")) {
          result.push(data);
        }
      });
      setUserList(result);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return userList;
}

export default useUserList;
