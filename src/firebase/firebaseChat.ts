import {
  doc,
  updateDoc,
  arrayUnion,
  collection,
  addDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { MessageSend } from "../types";

/**
 * 새로 작성한 채팅 메시지를 데이터 베이스에 저장합니다.
 * 첫 채팅 메시지의 경우, 새로운 데이터베이스 문서를 생성합니다.
 * 이미 해당 채팅에 관한 문서가 존재할 경우, 새로 작성한 메시지의 정보만 업데이트 합니다.
 * 아무 값도 반환하지 않습니다.
 * @param param - 새로 작성한 채팅 메시지에 대한 정보를 담은 객체
 * @param param.sender - 채팅 메시지를 작성한 유저의 닉네임
 * @param param.content - 채팅 메시지 내용
 * @param param.id - 채팅 메시지가 저장된 문서의 id, 첫 채팅 메시지일 경우 빈 문자열
 * @param param.chatWith - 채팅을 함께 하고 있는 상대방 유저의 닉네임
 * @returns {Promise<void>}
 */

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

/**
 * 데이터 베이스에 해당 채팅에 대한 새로운 문서를 만듭니다.
 * 아무 값도 반환하지 않습니다.
 * @param param - 채팅 메시지에 관한 내용
 * @param param.sender - 채팅 메시지를 작성한 유저의 닉네임
 * @param param.content - 채팅 메시지 내용
 * @param param.chatWith - 채팅을 함께 하고 있는 상대방 유저의 닉네임
 * @returns {Promise<void>}
 */

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
