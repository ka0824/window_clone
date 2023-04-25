import { useState, useEffect } from "react";

/**
 * 현재 스크롤의 위치를 관리하는 커스텀 훅입니다.
 * @returns {number} - 현재 스크롤 위치를 반환
 */

function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrollPosition;
}

export default useScrollPosition;
