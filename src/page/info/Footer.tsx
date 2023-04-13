import { BsGithub } from "react-icons/bs";
import { ImBlogger2 } from "react-icons/im";

function Footer() {
  return (
    <div className="border-t-2 px-16 h-12 flex justify-end items-center">
      <a className="mr-4" href="https://github.com/ka0824">
        <BsGithub size={28}></BsGithub>
      </a>
      <a href="https://ka0824.github.io/">
        <ImBlogger2 size={28}></ImBlogger2>
      </a>
    </div>
  );
}

export default Footer;
