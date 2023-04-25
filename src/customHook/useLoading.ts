import { useState, useEffect } from "react";

/**
 * 로딩을 관리하기 위한 커스텀 훅입니다.
 * 로딩 시간을 0.5초로 설정하였습니다.
 * @returns {Boolean} 로딩 여부
 */

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
