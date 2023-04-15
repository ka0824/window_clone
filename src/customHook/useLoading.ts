import { useState, useEffect } from "react";

function useLoading() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return isLoading;
}

export default useLoading;
