import { useState, useRef, useEffect } from "react";
import { BsFillChatRightFill } from "react-icons/bs";
import { HiUserGroup } from "react-icons/hi";
import useChatList from "../customHook/useChatList";
import { ChatType, Message } from "../types";
import useUserList from "../customHook/useUserList";
import useChatMessages from "../customHook/useChatMessages";
import { sendMessage } from "../firebase/firebaseChat";

type SetMenu = React.Dispatch<React.SetStateAction<string>>;
type SetChatWith = React.Dispatch<React.SetStateAction<string>>;

// 현재 데이터 베이스에 저장된 유저의 목록을 보여주는 컴포넌트 입니다.

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
    <div className="w-72">
      <div className="p-2 text-xl">유저 목록</div>
      <div className="h-60 overflow-y-scroll overflow-x-hidden">
        {filtered.map((user, idx) => (
          <User
            nickname={user.nickname}
            key={`user-${idx}`}
            setMenu={setMenu}
            setChatWith={setChatWith}
          ></User>
        ))}
      </div>
    </div>
  );
}

// 유저의 정보를 담고 있는 컴포넌트 입니다.
// UserList 컴포넌트 하위 컴포넌트 입니다.

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
      className="w-72 h-20 p-2 hover:bg-blue-100"
      onDoubleClick={handleDoubleClick}
    >{`${nickname}와의 대화`}</div>
  );
}

// 데이터 베이스에 현재 작성된 채팅의 목록을 보여주는 컴포넌트 입니다.

function ChatList({
  setMenu,
  setChatWith,
}: {
  setMenu: SetMenu;
  setChatWith: SetChatWith;
}) {
  const chatList = useChatList();

  return (
    <div className="w-72">
      <div className="p-2 text-xl">채팅 목록</div>
      {chatList.map((chat, idx) => (
        <ChatFolder
          key={`chatFolder-${idx}`}
          data={chat}
          setMenu={setMenu}
          setChatWith={setChatWith}
        ></ChatFolder>
      ))}
    </div>
  );
}

// ChatList의 하위 컴포넌트로, 각 채팅들의 정보를 담고 있는 컴포넌트 입니다.

function ChatFolder({
  data,
  setMenu,
  setChatWith,
}: {
  data: ChatType;
  setMenu: SetChatWith;
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
      className="h-20 w-72 flex flex-col p-2 hover:bg-blue-100"
      onDoubleClick={handleDoubleClick}
    >
      <div>{partner}</div>
      <div className="truncate mt-2">{lastMessage}</div>
    </div>
  );
}

// 채팅방 화면을 보여주는 컴포넌트 입니다.

function ChatRoom({ chatWith }: { chatWith: string }) {
  const { chatMessages, dataId } = useChatMessages(chatWith);
  const chatRoomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRoomRef.current) {
      chatRoomRef.current.scrollTop = chatRoomRef.current.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div className="w-72 flex flex-col">
      <div>{chatWith}님과의 대화</div>
      <div className="bg-blue-300 h-48 overflow-y-scroll" ref={chatRoomRef}>
        {chatMessages.map((message: Message) => {
          if (message.sender === chatWith) {
            return (
              <pre className="bg-white ml-1 mt-2 mb-2 p-2 mr-10 whitespace-pre-wrap break-all rounded-lg">
                {message.content}
              </pre>
            );
          } else {
            return (
              <pre className="bg-yellow-300 mr-1 mt-2 mb-2 text-right min-w-10 p-2 ml-10 whitespace-pre-wrap break-all rounded-lg">
                {message.content}
              </pre>
            );
          }
        })}
      </div>
      <ChatInput chatWith={chatWith} dataId={dataId}></ChatInput>
    </div>
  );
}

// 채팅 입력 창 컴포넌트 입니다.

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
    <div className="flex flex-col">
      <textarea
        className="h-12 resize-none"
        ref={inputRef}
        onKeyDown={handleKeyDown}
      ></textarea>
      <button
        className="bg-red-50 w-20 ml-auto mr-4 mb-2 mt-2"
        onClick={handleSubmit}
      >
        보내기
      </button>
    </div>
  );
}

// Chat 프로그램의 가장 상위 컴포넌트 입니다.
// menu는 어떤 내용을 렌더링할 지 결정하는 데에 사용됩니다.
// chatWith은 채팅의 상대방이 누구인지를 저장합니다.

function Chat() {
  const [menu, setMenu] = useState("userList");
  const [chatWith, setChatWith] = useState("");

  function handleClick(e: React.MouseEvent<HTMLElement>) {
    setMenu(e.currentTarget.dataset.name || "");
  }

  return (
    <div className="flex h-72">
      <div className="flex flex-col">
        <button
          className={
            menu !== "userList"
              ? "p-2 hover:bg-gray-200 hover:text-blue-400 hover:cursor-default"
              : "p-2 text-blue-400 hover:cursor-default"
          }
          data-name="userList"
          onClick={handleClick}
        >
          <HiUserGroup size={32}></HiUserGroup>
        </button>
        <button
          className={
            menu !== "chatList"
              ? "p-2 hover:bg-gray-200 hover:text-blue-400 hover:cursor-default"
              : "p-2 text-blue-400 hover:cursor-default"
          }
          data-name="chatList"
          onClick={handleClick}
        >
          <BsFillChatRightFill size={32}></BsFillChatRightFill>
        </button>
      </div>
      <div className="flex flex-col"></div>
      {menu === "userList" && (
        <UserList setMenu={setMenu} setChatWith={setChatWith}></UserList>
      )}
      {menu === "chatList" && (
        <ChatList setMenu={setMenu} setChatWith={setChatWith}></ChatList>
      )}
      {menu === "chatRoom" && <ChatRoom chatWith={chatWith}></ChatRoom>}
    </div>
  );
}

export default Chat;
