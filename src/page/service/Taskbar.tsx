import { AiFillWindows } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import Clock from "./Clock";

function TaskBar() {
  return (
    <div className="flex justify-between bg-task h-8 items-center px-2">
      <div className="flex">
        <div className="flex justify-center items-center w-8 hover:bg-slate-100 h-8 hover:text-sky-500">
          <AiFillWindows size={20}></AiFillWindows>
        </div>
        <div className="flex justify-center items-center w-8 hover:bg-slate-100 h-8">
          <BsSearch size={16}></BsSearch>
        </div>
      </div>
      <Clock></Clock>
    </div>
  );
}

export default TaskBar;
