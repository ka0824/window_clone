import Loading from "../../component/Loading";
import useLoading from "../../customHook/useLoading";
import TaskBar from "./Taskbar";

function Service() {
  const isLoading = useLoading();

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="bg-window flex-1"></div>
      <TaskBar></TaskBar>
    </div>
  );
}

export default Service;
