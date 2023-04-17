import { useDispatch } from "react-redux";
import {
  deleteSingleIcon,
  renameSingleIcon,
  renameStart,
} from "../store/slice/iconSlice";

function ContextMenu({
  menuPos,
  handleContextMenuClose,
  handleRenameOn,
}: {
  menuPos: { x: number; y: number };
  handleContextMenuClose: () => void;
  handleRenameOn: () => void;
}) {
  const dispatch = useDispatch();

  function handleRename() {
    dispatch(renameStart());
    handleContextMenuClose();
  }

  function handleDelete() {
    dispatch(deleteSingleIcon());
    handleContextMenuClose();
  }

  return (
    <div
      className="bg-white z-20 context-shadow rounded overflow-hidden absolute w-28"
      style={{ left: menuPos.x, top: menuPos.y }}
    >
      <div className="p-2 hover:bg-gray-200 w-full" onClick={handleRename}>
        이름 바꾸기
      </div>
      <div className="p-2 hover:bg-gray-200 w-full" onClick={handleDelete}>
        삭제
      </div>
    </div>
  );
}

export default ContextMenu;
