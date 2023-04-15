import { useState } from "react";

function useModal() {
  const [isShow, setIsShow] = useState(true);

  const handleClose = () => {
    setIsShow(false);
  };

  return [isShow, handleClose];
}

export default useModal;
