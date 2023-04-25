import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

/**
 * 데이터베이스에 새로 작성한 게시판 글을 등록합니다.
 * 게시판 글이 저장된 문서의 아이디 문자열을 반환합니다.
 * @param data - 새로 작성한 게시판 글에 대한 정보 객체
 * @param data.title - 글 제목
 * @param data.content - 글 내용
 * @param data.writer - 작성자 닉네임
 * @returns {Promise<string>} - 게시판 글이 저장된 문서의 아이디
 */

export async function postNotice(data: {
  title: string;
  content: string;
  writer: string;
}) {
  try {
    const { title, content, writer } = data;
    const notice = collection(db, "notice");

    const result = await addDoc(notice, {
      title,
      content,
      writer,
      comment: [],
    });

    return result.id;
  } catch (error) {
    throw error;
  }
}

/**
 * 새로 작성한 댓글을 데이터 베이스에 등록합니다.
 * 아무 값도 반환하지 않습니다.
 * @param content - 작성한 댓글 내용
 * @param id - 현재 게시판 글의 문서 아이디
 * @returns {Promise<void>}
 */

export async function addComment(content: string, id: string) {
  try {
    const notice = doc(db, "notice", id);

    await updateDoc(notice, {
      comment: arrayUnion({
        writer: localStorage.getItem("nickname"),
        content,
      }),
    });
  } catch (error) {
    throw error;
  }
}
