import { useState, useEffect } from "react";

/**
 * 현재 날짜를 관리하기 위한 커스텀 훅입니다.
 * @returns {string} YYYY-MM-DD 형식의 문자열로 된 날짜
 */

function useCurrentDate() {
  const [currentTime, setCurrentTime] = useState(
    new Date()
      .toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\//g, "-")
  );

  useEffect(() => {
    const [month, day, year] = currentTime.split("-");

    setCurrentTime(`${year}-${month}-${day}`);
  }, []);

  return currentTime;
}

export default useCurrentDate;
