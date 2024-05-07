import { useState } from "react";
import { BsList, BsPencilSquare } from "react-icons/bs";
import {
  useForm,
  Controller,
  SubmitHandler,
  FieldValues,
} from "react-hook-form";
import useNoticeList from "../customHook/useNoticeList";
import { CommentType, NoticeType } from "../types";
import { addComment, postNotice } from "../firebase/firebaseNotice";
import useNoticeView from "../customHook/useNoticeView";
import { AiFillNotification } from "react-icons/ai";

type SetMenu = React.Dispatch<React.SetStateAction<string>>;
type SetDataId = React.Dispatch<React.SetStateAction<string>>;

function Comment({ data }: { data: CommentType }) {
  const { writer, content } = data;

  return (
    <div className="flex flex-col p-4 bg-gray-100 ">
      <div className="text-sm text-gray-600 mb-4">작성자: {writer}</div>
      <div className="rounded-lg shadow-md mb-4">
        <pre className="p-4 text-gray-800 ">{content}</pre>
      </div>
    </div>
  );
}

function CommentList({
  dataId,
  comment,
}: {
  dataId: string;
  comment: CommentType[];
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    await addComment(data.comment, dataId);
  };

  return (
    <div className="bg-gray-100 rounded-lg">
      <div className="bg-gray-300 px-4 py-2 rounded-t-lg mb-4">
        <h2 className="text-xl font-bold text-gray-800">댓글</h2>
      </div>
      {comment.map((element, index) => (
        <Comment data={element} key={`comment-${index}`} />
      ))}
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="comment"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <textarea
              className="border-2 mb-2 resize-none w-full p-2 rounded-lg"
              placeholder="댓글을 작성하세요."
              {...field}
            />
          )}
        />
        <div className="w-full flex justify-end">
          <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors duration-300">
            작성
          </button>
        </div>
      </form>
    </div>
  );
}

function ViewPost({ dataId }: { dataId: string }) {
  const noticeView = useNoticeView(dataId);
  const { title, content, comment, writer } = noticeView;

  return (
    <div className="flex flex-col p-4 bg-gray-100 rounded-lg shadow-lg">
      <div className="bg-blue-200 px-4 py-2 rounded-t-lg mb-4">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      </div>

      <div className="text-sm text-gray-600 mb-4">작성자: {writer}</div>

      <div className="bg-white rounded-lg min-h-[200px] shadow-md mb-4">
        <pre className="p-4 text-gray-800 ">{content}</pre>
      </div>
      <CommentList dataId={dataId} comment={comment} />
    </div>
  );
}

function Write({
  setMenu,
  setDataId,
}: {
  setMenu: SetMenu;
  setDataId: SetDataId;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setDataId(
      await postNotice({
        title: data.title,
        content: data.title,
        writer: localStorage.getItem("nickname") || "",
      })
    );
    setMenu("viewPost");
  };

  return (
    <form
      className="flex flex-col h-full p-4 bg-gray-100 rounded-lg shadow-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="title"
        control={control}
        defaultValue=""
        rules={{
          required: true,
        }}
        render={({ field }) => (
          <input
            className="border-2 mb-2 p-2 rounded-lg"
            placeholder="제목을 입력하세요."
            {...field}
          />
        )}
      />
      <Controller
        name="content"
        control={control}
        defaultValue=""
        rules={{
          required: true,
        }}
        render={({ field }) => (
          <textarea
            className="flex-1 border-2 mb-2 p-2 resize-none rounded-lg"
            placeholder="내용을 입력하세요."
            {...field}
          />
        )}
      />
      <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors duration-300">
        작성
      </button>
    </form>
  );
}

function Brief({
  data,
  setMenu,
  setDataId,
}: {
  data: NoticeType;
  setMenu: SetMenu;
  setDataId: SetDataId;
}) {
  const { writer, content, title, id } = data;

  function handleDoubleClick() {
    setMenu("viewPost");
    setDataId(id ?? "");
  }

  return (
    <div
      className="flex bg-white  p-4 mb-2 hover:bg-gray-300 border-b-2 rounded-lg cursor-pointer shadow-md"
      onDoubleClick={handleDoubleClick}
    >
      <div className="flex flex-col mt-1">
        <div className="w-32 truncate text-gray-600">{writer}</div>
      </div>
      <div className="flex flex-col">
        <div className="text-lg font-bold text-black mb-2">{title}</div>
        <div className="text-sm text-gray-600">{content}</div>
      </div>
    </div>
  );
}

function NoticeList({
  setMenu,
  setDataId,
}: {
  setMenu: SetMenu;
  setDataId: SetDataId;
}) {
  const noticeList = useNoticeList();

  function handleClick() {
    setMenu("write");
  }

  return (
    <div className="flex flex-col w-ful h-full bg-gray-100 rounded-lg shadow-lg p-4 pr-0">
      <div className="flex-1 overflow-y-auto pr-2">
        {noticeList.map((notice, index) => (
          <Brief
            data={notice}
            key={`brief-${index}`}
            setMenu={setMenu}
            setDataId={setDataId}
          ></Brief>
        ))}
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-4 rounded-lg hover:bg-blue-600 transition duration-300 mr-2 flex justify-center "
        onClick={handleClick}
      >
        <BsPencilSquare size={24} className="mr-2" />
        글쓰기
      </button>
    </div>
  );
}

function Notice() {
  const [menu, setMenu] = useState("noticeList");
  const [dataId, setDataId] = useState("");

  function handleClick() {
    setMenu("noticeList");
  }

  return (
    <div className="flex h-[500px] w-[600px]">
      <button
        className={
          menu !== "noticeList"
            ? "p-2 hover:bg-gray-200 hover:text-blue-400 hover:cursor-default mb-auto"
            : "p-2 text-blue-400 hover:cursor-default mb-auto"
        }
        onClick={handleClick}
      >
        <BsList size={32}></BsList>
      </button>
      <div className="w-[640px] h-[500px] overflow-y-scroll bg-gray-100">
        {menu === "noticeList" && (
          <NoticeList setMenu={setMenu} setDataId={setDataId}></NoticeList>
        )}
        {menu === "viewPost" && <ViewPost dataId={dataId}></ViewPost>}
        {menu === "write" && (
          <Write setMenu={setMenu} setDataId={setDataId}></Write>
        )}
      </div>
    </div>
  );
}

export default Notice;
