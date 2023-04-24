import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { NoticeType } from "../types";

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
