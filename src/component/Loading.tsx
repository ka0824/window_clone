import { ImWindows } from "react-icons/im";

function Loading() {
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <div className="border-20px border-indigo-100 border-t-blue-300 rounded-full w-48 h-48 absolute spinner"></div>
      <ImWindows size={100} color={"#2563eb"}></ImWindows>
    </div>
  );
}

export default Loading;
