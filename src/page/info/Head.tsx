import { Link } from "react-router-dom";

function Head() {
  return (
    <div className="flex items-center justify-between bg-gradient-to-r from-gray-100 to-gray-200">
      <div className="h-16 w-full max-w-screen-xl mx-auto px-4 sm:px-12 md:px-20 lg:px-32 xl:px-48 flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
        <div className="text-xl text-white">윈도우 클론</div>
        <Link to="/service">
          <button className="rounded-full bg-blue-700 px-4 h-10 text-white hover:bg-blue-900 shadow-md transition-all duration-300">
            체험하기
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Head;
