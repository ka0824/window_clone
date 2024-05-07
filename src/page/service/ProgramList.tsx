import { useRef, useEffect, useState, useLayoutEffect } from "react";
import Modal from "react-modal";
import { IoClose } from "react-icons/io5";
import { VscChromeMinimize } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  close,
  handleZIndex,
  toggleMinimize,
} from "../../store/slice/programSlice";
import programs from "../../data/programs";
import useProgramDrag from "../../customHook/useProgramDrag";
import { ProgramProps, RootState } from "../../types";

function Program({ data }: { data: ProgramProps }) {
  const dispatch = useDispatch();
  const programRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  const { programPos, eventHandlers } = useProgramDrag(size, data.id, data.pos);

  function handleMinimize(e: React.MouseEvent, id: string) {
    e.stopPropagation();
    dispatch(toggleMinimize(id));
  }

  function handleClose(e: React.MouseEvent, id: string) {
    e.stopPropagation();
    dispatch(close(id));
  }

  function handleClick(id: string) {
    dispatch(handleZIndex(id));
  }

  function getSize() {
    const contentNode = document.querySelector(".ReactModal__Content");

    if (contentNode) {
      const { width, height } = contentNode.getBoundingClientRect();
      setSize({ width, height });
    }
  }

  return (
    <Modal
      isOpen={true}
      style={{
        content: {
          position: "absolute",
          top: programPos.y,
          left: programPos.x,
          padding: 0,
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          zIndex: data.zIndex,
        },
      }}
      overlayClassName="program-overlay"
      onAfterOpen={getSize}
    >
      <div
        className="flex flex-col"
        onClick={() => handleClick(data.id)}
        ref={programRef}
        draggable
      >
        <div
          className="bg-blue-100 h-8 flex justify-end program-header"
          onMouseDown={eventHandlers.handleMouseDown}
        >
          <button onClick={(e) => handleMinimize(e, data.id)}>
            <VscChromeMinimize size={24}></VscChromeMinimize>
          </button>
          <button onClick={(e) => handleClose(e, data.id)}>
            <IoClose size={24}></IoClose>
          </button>
        </div>
        <div className="flex-1">{programs[data.type]}</div>
      </div>
    </Modal>
  );
}

function ProgramList() {
  const executed = useSelector((state: RootState) => state.program.executed);

  return (
    <div>
      {executed.map((program, index) => {
        if (program.isMinimize) return null;
        return <Program data={program} key={`program-${index}`}></Program>;
      })}
    </div>
  );
}

export default ProgramList;
