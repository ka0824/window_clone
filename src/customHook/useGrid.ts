import { useState, useEffect } from "react";

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
