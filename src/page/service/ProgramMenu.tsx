import { useEffect, useRef } from "react";
import { signOut } from "../../firebase/firebaseAuth";
import { useDispatch } from "react-redux";
import { closeAll } from "../../store/slice/programSlice";

interface ProgramMenuProps {
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
  menuRef: React.RefObject<HTMLDivElement>;
}

function ProgramMenu({ setShowMenu, menuRef }: ProgramMenuProps) {
  const dispatch = useDispatch();

  async function handleSignOut() {
    await signOut();
    dispatch(closeAll());

    setShowMenu(false);
  }

  return (
    <div className="bg-task absolute bottom-12 context-shadow" ref={menuRef}>
      <button
        className="px-4 py-2 hover:cursor-default hover:bg-slate-100"
        onClick={handleSignOut}
      >
        로그아웃
      </button>
    </div>
  );
}

export default ProgramMenu;
