import { useState, useRef, useEffect } from "react";
import { BsFillChatRightFill } from "react-icons/bs";
import { HiUserCircle, HiUserGroup } from "react-icons/hi";
import useChatList from "../customHook/useChatList";
import { ChatType, Message } from "../types";
import useUserList from "../customHook/useUserList";
import useChatMessages from "../customHook/useChatMessages";
import { sendMessage } from "../firebase/firebaseChat";
import { AiOutlineMessage } from "react-icons/ai";

type SetMenu = React.Dispatch<React.SetStateAction<string>>;
type SetChatWith = React.Dispatch<React.SetStateAction<string>>;

function UserList({
  setMenu,
  setChatWith,
}: {
  setMenu: SetMenu;
  setChatWith: SetChatWith;
}) {
  const userList = useUserList();
  const filtered = userList.filter(
    (user) => user.nickname !== localStorage.getItem("nickname")
  );

  return (
    <div className="w-full h-full bg-gray-100 rounded-lg shadow-lg p-4">
      <h2 className="text-2xl mb-4 font-bold">유저 목록</h2>
      <div className="overflow-y-auto h-96">
        {filtered.map((user, idx) => (
          <User
            nickname={user.nickname}
            key={`user-${idx}`}
            setMenu={setMenu}
            setChatWith={setChatWith}
          />
        ))}
      </div>
    </div>
  );
}

function User({
  nickname,
  setMenu,
  setChatWith,
}: {
  nickname: string;
  setMenu: SetMenu;
  setChatWith: SetChatWith;
}) {
  function handleDoubleClick() {
    setMenu("chatRoom");
    setChatWith(nickname);
  }

  return (
    <div
      className="flex items-center p-2 mb-2 hover:bg-gray-200 hover:text-gray-800 rounded-lg cursor-pointer transition duration-300"
      onDoubleClick={handleDoubleClick}
    >
      <div className="flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full mr-4">
        <HiUserCircle className="text-gray-600" size={28} />
      </div>
      <div className="flex flex-col">
        <div className="text-lg font-bold text-gray-800">{nickname}</div>
        <div className="text-sm text-gray-500">대화 시작!</div>
      </div>
    </div>
  );
}

function ChatList({
  setMenu,
  setChatWith,
}: {
  setMenu: SetMenu;
  setChatWith: SetChatWith;
}) {
  const chatList = useChatList();

  return (
    <div className="w-full h-full bg-gray-100 rounded-lg shadow-lg p-4">
      <h2 className="text-2xl mb-4 font-bold">채팅방 목록</h2>
      {chatList.map((chat, idx) => (
        <ChatFolder
          key={`chatFolder-${idx}`}
          data={chat}
          setMenu={setMenu}
          setChatWith={setChatWith}
        />
      ))}
    </div>
  );
}

function ChatFolder({
  data,
  setMenu,
  setChatWith,
}: {
  data: ChatType;
  setMenu: SetMenu;
  setChatWith: SetChatWith;
}) {
  const { chatter, messages } = data;
  const [person1, person2] = chatter.split("_");
  const partner =
    person1 === localStorage.getItem("nickname") ? person2 : person1;
  const lastMessage = messages[messages.length - 1].content;

  function handleDoubleClick() {
    setMenu("chatRoom");
    setChatWith(partner);
  }

  return (
    <div
      className="flex items-center p-2 mb-2 hover:bg-gray-200 hover:text-gray-800 rounded-lg cursor-pointer transition duration-300"
      onDoubleClick={handleDoubleClick}
    >
      <div className="flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full mr-4">
        <HiUserCircle className="text-gray-600" size={28} />
      </div>
      <div className="flex flex-col">
        <div className="text-lg font-bold text-gray-800">{partner}</div>
        <div className="text-sm text-gray-500">{lastMessage}</div>
      </div>
      <div className="ml-auto">
        <AiOutlineMessage className="text-blue-500" size={24} />
      </div>
    </div>
  );
}

function ChatRoom({ chatWith }: { chatWith: string }) {
  const { chatMessages, dataId } = useChatMessages(chatWith);
  const chatRoomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRoomRef.current) {
      chatRoomRef.current.scrollTop = chatRoomRef.current.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div className="w-full h-[460px]  p-4 ">
      <h2 className="text-2xl mb-4 font-bold">{chatWith}님과의 대화</h2>
      <div className="h-[330px] overflow-y-auto">
        {chatMessages.map((message: Message, index) => {
          if (message.sender === chatWith) {
            return (
              <div
                key={`${message.sender}_${index}`}
                className="flex items-start mb-4"
              >
                <div className="bg-white p-3 rounded-lg max-w-2/3 break-words">
                  {message.content}
                </div>
              </div>
            );
          } else {
            return (
              <div
                key={`${message.sender}_${index}`}
                className="flex items-start justify-end mb-4"
              >
                <div className="bg-blue-200 p-3 rounded-lg max-w-2/3 break-words">
                  {message.content}
                </div>
              </div>
            );
          }
        })}
      </div>
      <ChatInput chatWith={chatWith} dataId={dataId}></ChatInput>
    </div>
  );
}

function ChatInput({ chatWith, dataId }: { chatWith: string; dataId: string }) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  async function handleSubmit() {
    if (inputRef.current) {
      await sendMessage({
        sender: localStorage.getItem("nickname") ?? "",
        content: inputRef.current.value,
        id: dataId,
        chatWith,
      });
      inputRef.current.value = "";
    }
  }

  async function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit();
    }
  }

  return (
    <div className="flex items-center mt-4">
      <textarea
        className="resize-none flex-1 mr-4 p-2 rounded-lg border-2 border-gray-300"
        ref={inputRef}
        onKeyDown={handleKeyDown}
      ></textarea>
      <button
        className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors duration-300"
        onClick={handleSubmit}
      >
        전송
      </button>
    </div>
  );
}

function Chat() {
  const [menu, setMenu] = useState("userList");
  const [chatWith, setChatWith] = useState("");

  function handleClick(e: React.MouseEvent<HTMLElement>) {
    setMenu(e.currentTarget.dataset.name || "");
  }

  return (
    <div className="flex h-[500px] w-[600px] ">
      <div className="flex flex-col">
        <button
          className={`p-2 ${
            menu === "userList"
              ? "text-blue-400"
              : "hover:bg-gray-200 hover:text-blue-400"
          }`}
          data-name="userList"
          onClick={handleClick}
        >
          <HiUserGroup size={32} />
        </button>
        <button
          className={`p-2 ${
            menu === "chatList"
              ? "text-blue-400"
              : "hover:bg-gray-200 hover:text-blue-400"
          }`}
          data-name="chatList"
          onClick={handleClick}
        >
          <BsFillChatRightFill size={32} />
        </button>
      </div>
      <div className="flex flex-col w-[640px] h-[500px] bg-gray-100">
        {menu === "userList" && (
          <UserList setMenu={setMenu} setChatWith={setChatWith} />
        )}
        {menu === "chatList" && (
          <ChatList setMenu={setMenu} setChatWith={setChatWith} />
        )}
        {menu === "chatRoom" && <ChatRoom chatWith={chatWith} />}
      </div>
    </div>
  );
}

export default Chat;
