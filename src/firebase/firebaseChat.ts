import {
  doc,
  updateDoc,
  arrayUnion,
  collection,
  addDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { MessageSend } from "../types";

export async function sendMessage({
  sender,
  content,
  id,
  chatWith,
}: MessageSend) {
  try {
    if (id === "") {
      return await makeChat({ sender, content, chatWith });
    }
    if (id) {
      const chat = doc(db, "chat", id);

      await updateDoc(chat, {
        messages: arrayUnion({ sender, content }),
      });
    }
  } catch (error) {
    throw error;
  }
}

export async function makeChat({ chatWith, sender, content }: MessageSend) {
  try {
    const chat = collection(db, "chat");

    await addDoc(chat, {
      chatter: `${localStorage.getItem("nickname")}_${chatWith}`,
      messages: [
        {
          sender: sender,
          content: content,
        },
      ],
    });
  } catch (error) {
    throw error;
  }
}
