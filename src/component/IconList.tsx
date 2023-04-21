import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux/es/exports";
import { useDispatch } from "react-redux";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
} from "react-grid-dnd";
import icons from "../data/icons";
import {
  changeDisplay,
  renameEnd,
  renameSingleIcon,
  resetSelect,
  selectSingleIcon,
} from "../store/slice/iconSlice";
import useContextMenu from "../customHook/useContextMenu";
import ContextMenu from "./ContextMenu";
import useGrid from "../customHook/useGrid";
import { IconProps, RootState } from "../types";
import { execute } from "../store/slice/programSlice";

function Icon({ title, type, id, handleContextMenuClose }: IconProps) {
  const selectedIcon = useSelector(
    (state: RootState) => state.icon.selectedIcon
  );
  const renamedIcon = useSelector((state: RootState) => state.icon.renamedIcon);
  const dispatch = useDispatch();
  const iconRef = useRef<HTMLDivElement>(null);

  function handleClick() {
    dispatch(selectSingleIcon(id));
  }

  function handleContextMenu(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    dispatch(selectSingleIcon(id));
  }

  function handleNameChange(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      dispatch(renameSingleIcon({ id, newTitle: event.currentTarget.value }));
      dispatch(renameEnd());
    }
  }

  function handleDoubleClick() {
    dispatch(execute({ id, title, type }));
  }

  function handleOutside(e: MouseEvent) {
    const target = e.target as Node;
    if (iconRef.current && !iconRef.current.contains(target)) {
      handleContextMenuClose();
    }
  }

  useEffect(() => {
    window.addEventListener("click", handleOutside);

    return () => {
      window.removeEventListener("click", handleOutside);
    };
  });

  return (
    <div
      className="flex flex-col items-center justify-center w-20 h-20 group"
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      onDoubleClick={handleDoubleClick}
      ref={iconRef}
    >
      <div className="z-10 flex flex-col items-center justify-center">
        {icons[type]}
        {renamedIcon === id ? (
          <input
            className="w-16 mt-1"
            defaultValue={title}
            onKeyDown={handleNameChange}
          ></input>
        ) : (
          <div className="mt-1 select-none w-16 truncate text-xs text-center">
            {title}
          </div>
        )}
      </div>
      <div
        className={
          selectedIcon.includes(id)
            ? "absolute w-20 h-20 bg-slate-200 opacity-40  rounded"
            : "absolute w-20 h-20 bg-slate-200 opacity-0 group-hover:opacity-30 rounded"
        }
      ></div>
    </div>
  );
}

function IconList() {
  const displayedIcon = useSelector(
    (state: RootState) => state.icon.displayedIcon
  );
  const dispatch = useDispatch();
  const row = useGrid();
  const [test, setTest] = useState(true);

  const {
    isContextMenuOpen,
    isRename,
    menuPos,
    handleContextMenuOpen,
    handleContextMenuClose,
    handleRenameOn,
    handleRenameOff,
  } = useContextMenu();

  const onChange = (
    sourceId: string,
    sourceIndex: number,
    targetIndex: number
  ) => {
    const result = swap(displayedIcon, sourceIndex, targetIndex);
    dispatch(changeDisplay(result));
  };

  function handleContextMenu(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    handleContextMenuOpen(event);
  }

  return (
    <div className="flex-1 overflow-x-hidden relative">
      {isContextMenuOpen && (
        <ContextMenu
          menuPos={menuPos}
          handleContextMenuClose={handleContextMenuClose}
          handleRenameOn={handleRenameOn}
        ></ContextMenu>
      )}
      <GridContextProvider onChange={onChange}>
        <GridDropZone
          id="icons"
          boxesPerRow={row}
          rowHeight={80}
          style={{ height: "100%" }}
        >
          {displayedIcon.map((icon, idx) => (
            <GridItem key={`icon-${idx}`} onContextMenu={handleContextMenu}>
              <Icon
                title={icon.title}
                id={icon.id}
                type={icon.type}
                handleContextMenuClose={handleContextMenuClose}
              ></Icon>
            </GridItem>
          ))}
        </GridDropZone>
      </GridContextProvider>
    </div>
  );
}

export default IconList;
