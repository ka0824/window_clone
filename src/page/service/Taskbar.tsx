import { useState } from "react";
import { AiFillWindows } from "react-icons/ai";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Clock from "./Clock";
import icons from "../../data/icons";
import {
  handleCurrentProgram,
  toggleMinimize,
} from "../../store/slice/programSlice";
import { RootState } from "../../types";

function TaskIcons() {
  const executed = useSelector((state: RootState) => state.program.executed);
  const currentProgram = useSelector(
    (state: RootState) => state.program.currentProgram
  );
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();

  function handleUnminimized(id: string) {
    dispatch(handleCurrentProgram(id));
    dispatch(toggleMinimize(id));
  }

  function handlePrev() {
    if (index !== 0) {
      setIndex((prevState) => prevState - 1);
    }
  }

  function handleNext() {
    if (index < executed.length - 1) {
      setIndex((prevState) => prevState + 1);
    }
  }

  return (
    <div className="h-12 flex-1 flex overflow-hidden">
      <button
        className="px-2 hover:bg-slate-50 h-12 hover:cursor-default"
        onClick={handlePrev}
      >
        <BsChevronLeft></BsChevronLeft>
      </button>
      <div className="flex-1 flex relative px-20 overflow-hidden">
        <div className="absolute w-52 flex" style={{ left: index * -68 }}>
          {executed.map((program, index) => {
            return (
              <div key={`taskIcon-${index}`}>
                <button
                  className={
                    program.id === currentProgram
                      ? "px-4 bg-slate-50 h-12 hover:cursor-default"
                      : "px-4 hover:bg-slate-100 h-12 hover:cursor-default"
                  }
                  onClick={() => handleUnminimized(program.id)}
                >
                  {icons[program.type]}
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <button
        className="px-2 hover:bg-slate-50 h-12 hover:cursor-default"
        onClick={handleNext}
      >
        <BsChevronRight></BsChevronRight>
      </button>
    </div>
  );
}

function TaskBar() {
  return (
    <div className="flex bg-task h-12 items-center px-2">
      <div className="flex">
        <div className="flex justify-center items-center hover:bg-slate-100 h-12 hover:text-sky-500 px-4">
          <AiFillWindows size={36}></AiFillWindows>
        </div>
        <div className="flex justify-center items-center hover:bg-slate-100 h-12 px-4">
          <BsSearch size={24}></BsSearch>
        </div>
        <span className="h-12 border-r-2 border-gray-300"></span>
      </div>
      <TaskIcons></TaskIcons>
      <div className="flex">
        <span className="h-12 border-r-2 border-gray-300"></span>
        <Clock></Clock>
      </div>
    </div>
  );
}

export default TaskBar;
