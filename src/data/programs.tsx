import Calculator from "../program/Calculator";
import Chat from "../program/Chat";
import DinoGame from "../program/DinoGame";
import Notice from "../program/Notice";
import Test from "../program/Test";
import Typing from "../program/Typing";

const programs: { [key: string]: React.ReactNode } = {
  test: <Test></Test>,
  calculator: <Calculator></Calculator>,
  chat: <Chat></Chat>,
  notice: <Notice></Notice>,
  typing: <Typing></Typing>,
  dinoGame: <DinoGame></DinoGame>,
};

export default programs;
