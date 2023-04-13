import { Link } from "react-router-dom";

function Head() {
  return (
    <div className="h-12 flex px-16 items-center justify-between border-b-2">
      <div className="text-xl">윈도우 클론</div>
      <Link to="/service">
        <button className="rounded-full bg-zinc-600 px-2 h-10 text-white hover:bg-zinc-800">
          체험하기
        </button>
      </Link>
    </div>
  );
}

export default Head;
