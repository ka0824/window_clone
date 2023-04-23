import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { db, firebase } from "../firebase/firebase";
import { getAuth } from "firebase/auth";
import { getIconStart } from "../store/slice/iconSlice";
import { collection } from "firebase/firestore";

function useLogin() {
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();
  const auth = getAuth(firebase);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setIsLogin(true);
        dispatch(getIconStart());
      } else {
        setIsLogin(false);
      }
    });
    return () => {};
  }, []);

  return isLogin;
}

export default useLogin;
