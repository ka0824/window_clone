import { useState, useEffect } from "react";

/**
 * 바탕화면에서 아이콘의 그리드를 적용하기 위한 커스텀 훅 입니다.
 * 한 아이콘의 가로 길이를 '80px'로 놓고, 현재 브라우저 가로 길이 값을 80으로 나눕니다.
 * 구한 결과값이 한줄에 들어갈 아이콘의 갯수가 됩니다.
 * @returns {number} 한 줄에 들어갈 아이콘의 갯수
 */

function useGrid() {
  const [row, setRow] = useState(Math.floor(window.innerWidth / 80));

  const handleRow = () => {
    setRow(Math.floor(window.innerWidth / 80));
  };

  useEffect(() => {
    window.addEventListener("resize", handleRow);

    return () => {
      window.removeEventListener("resize", handleRow);
    };
  }, []);

  return row;
}

export default useGrid;
