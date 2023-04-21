import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  handleCurrentProgram,
  handlePos,
  handleZIndex,
} from "../store/slice/programSlice";

function useProgramDrag(
  size: { width: number; height: number },
  id: string,
  pos: { x: number; y: number } | null
) {
  const dispatch = useDispatch();

  const [programPos, setProgramPos] = useState<{ x: number; y: number }>(
    pos === null ||
      pos.x + size.width >= window.innerWidth ||
      pos.y + size.height >= window.innerHeight
      ? {
          x: window.innerWidth / 2 - size.width / 2,
          y: (window.innerHeight - 48) / 2 - size.height / 2,
        }
      : { x: pos.x, y: pos.y }
  );
  const [isDrag, setIsDrag] = useState(false);
  const [isMove, setIsMove] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setProgramPos(
      pos === null ||
        pos.x + size.width >= window.innerWidth ||
        pos.y + size.height >= window.innerHeight
        ? {
            x: window.innerWidth / 2 - size.width / 2,
            y: (window.innerHeight - 48) / 2 - size.height / 2,
          }
        : { x: pos.x, y: pos.y }
    );
  }, [size]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;

    if (target.classList.contains("program-header")) {
      e.preventDefault();
      dispatch(handleZIndex(id));
      dispatch(handleCurrentProgram(id));

      if (isMove) {
        dragStartPos.current = {
          x: e.clientX - programPos.x,
          y: e.clientY - programPos.y,
        };
      } else {
        const parentNode = target.parentNode?.parentNode as HTMLElement;

        dragStartPos.current = {
          x: e.clientX - parentNode.offsetLeft,
          y: e.clientY - parentNode.offsetTop,
        };
      }

      setIsMove(true);
      setIsDrag(true);
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
    setProgramPos({
      x: window.innerWidth / 2 - size.width / 2,
      y: window.innerHeight / 2 - size.height / 2,
    });

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
