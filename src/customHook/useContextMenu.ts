import { useState } from "react";

/**
 * 컨텍스트 메뉴를 관리하기 위한 커스텀 훅입니다.
 * isContextMenuOpen: 컨텍스트 메뉴가 열려 있는지 여부를 나타내는 상태값
 * menuPos: 컨텍스트 메뉴의 위치를 나타내는 객체 { x, y}
 * isRename: 파일 이름을 변경하는 중인지 여부를 나타내는 상태값
 * @returns {object} 컨텍스트 메뉴 관련 상태값과 함수들을 가지고 있는 객체
 */

function useContextMenu() {
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });
  const [isRename, setIsRename] = useState(false);

  const handleContextMenuOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsContextMenuOpen(true);

    let xPos =
      event.clientX + 112 > window.innerWidth
        ? window.innerWidth - 112
        : event.clientX;

    setMenuPos({
      x: xPos,
      y: event.clientY - event.currentTarget.getBoundingClientRect().top,
    });
  };

  const handleContextMenuClose = () => {
    setIsContextMenuOpen(false);
  };

  const handleRenameOn = () => {
    setIsRename(true);
  };

  const handleRenameOff = () => {
    setIsRename(false);
  };

  return {
    isContextMenuOpen,
    isRename,
    menuPos,
    handleContextMenuOpen,
    handleContextMenuClose,
    handleRenameOn,
    handleRenameOff,
  };
}

export default useContextMenu;
