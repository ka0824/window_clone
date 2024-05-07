import { BsGithub } from "react-icons/bs";
import { ImBlogger2 } from "react-icons/im";

function Footer() {
  return (
    <div className="flex items-center justify-between bg-gradient-to-r from-gray-100 to-gray-200">
      <div className="h-16 w-full max-w-screen-xl mx-auto px-4 flex justify-between items-center  shadow-lg">
        <div className="text-xl">© 2024 윈도우 클론</div>
        <div className="flex">
          <a className="mr-4" href="https://github.com/ka0824">
            <BsGithub size={28}></BsGithub>
          </a>
          <a href="https://ka0824.github.io/">
            <ImBlogger2 size={28}></ImBlogger2>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
