import { useState, useEffect, useRef } from "react";

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
