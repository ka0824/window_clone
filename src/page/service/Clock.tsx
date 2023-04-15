import useCurrentTime from "../../customHook/useCurrentTime";

function Clock() {
  const currentTime = useCurrentTime();

  return (
    <div className="select-none hover:bg-slate-100 h-8 flex items-center px-2">
      {currentTime}
    </div>
  );
}

export default Clock;
