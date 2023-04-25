import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { deleteSingleIcon, renameStart } from "../store/slice/iconSlice";

function ContextMenu({
  menuPos,
  handleContextMenuClose,
}: {
  menuPos: { x: number; y: number };
  handleContextMenuClose: () => void;
}) {
  const dispatch = useDispatch();

  const handleRename = useCallback(() => {
    dispatch(renameStart());
    handleContextMenuClose();
  }, [dispatch, handleContextMenuClose]);

  const handleDelete = useCallback(() => {
    dispatch(deleteSingleIcon());
    handleContextMenuClose();
  }, [dispatch, handleContextMenuClose]);

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
