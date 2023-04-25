import useCurrentDate from "../../customHook/useCurrentDate";

function Clock() {
  const currentTime = useCurrentDate();

  return (
    <div className="select-none hover:bg-slate-100 h-12 flex items-center px-2">
      {currentTime}
    </div>
  );
}

export default Clock;
