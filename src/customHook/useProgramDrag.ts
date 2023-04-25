import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  handleCurrentProgram,
  handlePos,
  handleZIndex,
} from "../store/slice/programSlice";
import { Dispatch } from "redux";

// 프로그램 창 위치를 계산하는 함수
function getProgramPos(
  pos: { x: number; y: number } | null,
  size: { width: number; height: number }
) {
  if (
    pos === null ||
    pos.x + size.width >= window.innerWidth ||
    pos.y + size.height >= window.innerHeight
  ) {
    return {
      x: window.innerWidth / 2 - size.width / 2,
      y: (window.innerHeight - 48) / 2 - size.height / 2,
    };
  } else {
    return { x: pos.x, y: pos.y };
  }
}

// 드래그 이벤트를 시작하는 함수

function startDragging(
  isMove: boolean,
  dispatch: Dispatch,
  id: string,
  programPos: { x: number; y: number },
  e: React.MouseEvent<HTMLDivElement>,
  dragStartPos: React.MutableRefObject<{ x: number; y: number }>,
  setIsMove: React.Dispatch<React.SetStateAction<boolean>>,
  setIsDrag: React.Dispatch<React.SetStateAction<boolean>>
) {
  e.preventDefault();
  dispatch(handleZIndex(id));
  dispatch(handleCurrentProgram(id));

  if (isMove) {
    dragStartPos.current = {
      x: e.clientX - programPos.x,
      y: e.clientY - programPos.y,
    };
  } else {
    const parentNode = (e.target as HTMLElement)?.parentNode
      ?.parentNode as HTMLElement;

    dragStartPos.current = {
      x: e.clientX - parentNode.offsetLeft,
      y: e.clientY - parentNode.offsetTop,
    };
  }

  setIsMove(true);
  setIsDrag(true);
}

/**
 * 프로그램 창 드래그할 때에 위치 정보를 관리하는 커스텀 훅입니다.
 * 드래그할 때의 위치 정보를 관리하고, 드래그 이벤트 함수를 생성합니다.
 * @param size - 프로그램 창의 가로, 세로 길이를 담은 객체
 * @param id - 프로그램의 id
 * @param pos - 프로그램이 이전에 위치했던 x, y 좌표, 만약 프로그램이 이전에 열린 적이 없었다면, 브라우저의 정중앙으로 가도록 설정.
 * @returns {programPos, eventHandlers} - 프로그램의 위치정보를 담은 객체와, 드래그 이벤트를 담당하는 함수들이 들어간 객체를 반환
 */

function useProgramDrag(
  size: { width: number; height: number },
  id: string,
  pos: { x: number; y: number } | null
) {
  const dispatch = useDispatch();

  const [programPos, setProgramPos] = useState<{ x: number; y: number }>(
    getProgramPos(pos, size)
  );
  const [isDrag, setIsDrag] = useState(false);
  const [isMove, setIsMove] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const centerPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setProgramPos(getProgramPos(pos, size));
    centerPos.current = {
      x: window.innerWidth / 2 - size.width / 2,
      y: window.innerHeight / 2 - size.height / 2,
    };
  }, [size]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;

    if (target.classList.contains("program-header")) {
      startDragging(
        isMove,
        dispatch,
        id,
        programPos,
        e,
        dragStartPos,
        setIsMove,
        setIsDrag
      );
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDrag) {
      let xPos = e.clientX - dragStartPos.current.x;
      let yPos = e.clientY - dragStartPos.current.y;

      if (xPos + size.width >= window.innerWidth) {
        xPos = window.innerWidth - size.width;
      } else if (xPos <= 0) {
        xPos = 0;
      }

      if (yPos + size.height >= window.innerHeight) {
        yPos = window.innerHeight - size.height;
      } else if (yPos <= 0) {
        yPos = 0;
      }

      setProgramPos({
        x: xPos,
        y: yPos,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDrag(false);
    dispatch(handlePos({ id, pos: programPos }));
  };

  const handleResize = () => {
    setProgramPos(centerPos.current);
    dispatch(
      handlePos({
        id,
        pos: {
          x: window.innerWidth / 2 - size.width / 2,
          y: window.innerHeight / 2 - size.height / 2,
        },
      })
    );
  };

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [isDrag]);

  const eventHandlers = {
    handleMouseDown,
  };

  return { programPos, eventHandlers };
}

export default useProgramDrag;
