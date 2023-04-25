import { useState } from "react";

/**
 * 모달이 열리는 여부를 관리하는 커스텀 훅 입니다.
 * @returns {array} 모달이 열리는 여부, 모달을 닫는 함수를 반환
 */

function useModal(): [boolean, () => void] {
  const [isShow, setIsShow] = useState(true);

  const handleClose = () => {
    setIsShow(false);
  };

  return [isShow, handleClose];
}

export default useModal;
