import { AiOutlineFileText } from "react-icons/ai";
import { BsCalculatorFill } from "react-icons/bs";
import { BsFillChatTextFill } from "react-icons/bs";
import { AiFillNotification } from "react-icons/ai";
import { FaKeyboard } from "react-icons/fa";
import { GiDinosaurRex } from "react-icons/gi";
import { IconType } from "../types";

const icons: IconType = {
  test: <AiOutlineFileText size={36}></AiOutlineFileText>,
  calculator: <BsCalculatorFill size={36}></BsCalculatorFill>,
  chat: <BsFillChatTextFill size={36}></BsFillChatTextFill>,
  notice: <AiFillNotification size={36}></AiFillNotification>,
  typing: <FaKeyboard size={36}></FaKeyboard>,
  dinoGame: <GiDinosaurRex size={36}></GiDinosaurRex>,
};
export default icons;
