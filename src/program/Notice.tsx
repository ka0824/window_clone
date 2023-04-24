import { useState } from "react";
import { BsList } from "react-icons/bs";
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

type SetMenu = React.Dispatch<React.SetStateAction<string>>;
type SetDataId = React.Dispatch<React.SetStateAction<string>>;

function Comment({ data }: { data: CommentType }) {
  const { writer, content } = data;

  return (
    <div className="flex flex-col my-2">
      <div className="bg-gray-100 mb-2">{writer}</div>
      <pre>{content}</pre>
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
    watch,
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    await addComment(data.comment, dataId);
  };

  return (
    <div className="flex flex-col">
      <div>댓글</div>
      {comment.map((element, index) => {
        return <Comment data={element} key={`comment-${index}`}></Comment>;
      })}
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="comment"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <textarea className="border-2 mb-2 resize-none w-full" {...field} />
          )}
        ></Controller>
        <div className="w-full flex">
          <button className="bg-red-100 w-20 ml-auto">작성</button>
        </div>
      </form>
    </div>
  );
}

function ViewPost({ dataId }: { dataId: string }) {
  const noticeView = useNoticeView(dataId);
  const { title, content, comment, writer } = noticeView;

  return (
    <div className="flex flex-col p-2 oveflow-y-scroll">
      <div className="mb-2 text-xl">{title}</div>
      <div className="mb-2 bg-blue-50 p-2">{writer}</div>
      <pre className="whitespace-pre-wrap break-all mb-2 border-b-2 p-2">
        {content}
      </pre>
      <CommentList dataId={dataId} comment={comment}></CommentList>
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
    watch,
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
      className="w-76 flex flex-col h-full p-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="title"
        control={control}
        defaultValue=""
        rules={{
          required: true,
        }}
        render={({ field }) => <input className="border-2 mb-2" {...field} />}
      />
      <Controller
        name="content"
        control={control}
        defaultValue=""
        rules={{
          required: true,
        }}
        render={({ field }) => (
          <textarea className="flex-1 border-2 mb-2 resize-none" {...field} />
        )}
      />
      <button className="bg-red-100 w-20 ml-auto">작성</button>
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
      className="flex hover:bg-gray-200 border-b-2"
      onDoubleClick={handleDoubleClick}
    >
      <div className="flex flex-col p-1">
        <div className="w-40 truncate mb-2">{title}</div>
        <div className="w-40 truncate">{content}</div>
      </div>
      <div className="w-32 truncate mb-auto p-1">{writer}</div>
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
    <div className="flex flex-col w-76 h-full">
      <div className="flex-1 overflow-y-scroll">
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
        className="bg-red-200 ml-auto mr-2 mb-2 mt-2 px-2 py-1"
        onClick={handleClick}
      >
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
    <div className="flex">
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
      <div className="w-72 h-60">
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
