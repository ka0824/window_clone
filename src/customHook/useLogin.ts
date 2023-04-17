import { useState, useEffect } from "react";

function useLogin() {
  const [isLogin, setIsLogin] = useState(false);

  function handleStorage() {
    console.log(localStorage.getItem("userEmail"));

    setIsLogin(!!localStorage.getItem("userEmail"));
  }

  useEffect(() => {
    if (
      localStorage.getItem("userEmail") &&
      localStorage.getItem("userEmail") !== "guest"
    ) {
      setIsLogin(true);
    }

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  return isLogin;
}

export default useLogin;
