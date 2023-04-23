import { useEffect, useRef } from "react";
import { signOut } from "../../firebase/firebaseAuth";

interface ProgramMenuProps {
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
  menuRef: React.RefObject<HTMLDivElement>;
}

function ProgramMenu({ setShowMenu, menuRef }: ProgramMenuProps) {
  async function handleSignOut() {
    await signOut();
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
