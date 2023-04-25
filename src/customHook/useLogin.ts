import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { firebase } from "../firebase/firebase";
import { getAuth } from "firebase/auth";
import { getIconStart } from "../store/slice/iconSlice";

/**
 * 로그인 여부를 관리하는 커스텀 훅 입니다.
 * @returns {Boolean} 로그인 여부
 */

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
