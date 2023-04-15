import { useState, useEffect } from "react";

function useCurrentTime() {
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

export default useCurrentTime;
