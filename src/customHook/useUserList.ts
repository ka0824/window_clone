import { collection, onSnapshot, query } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { UserInfo } from "../types";

function useUserList() {
  const [userList, setUserList] = useState<UserInfo[]>([]);

  useEffect(() => {
    const target = query(collection(db, "users"));
    const unsubscribe = onSnapshot(target, (snapshot) => {
      const result: UserInfo[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data() as UserInfo;
        result.push(data);
      });
      setUserList(result);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  console.log(userList);

  return userList;
}

export default useUserList;
