import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInAnonymously,
  User,
} from "firebase/auth";

async function isNicknameAvailable(nickname: string) {
  try {
    const users = collection(db, "users");
    const result = await getDocs(
      query(users, where("nickname", "==", nickname))
    );

    return result.empty;
  } catch (error) {
    throw error;
  }
}

async function updateNickname(user: User | null, nickname: string) {
  try {
    const users = collection(db, "users");

    if (user === null) {
      throw new Error("User is null");
    }
    const userDocRef = doc(users, user.uid);

    await setDoc(userDocRef, {
      uid: user.uid,
      nickname: nickname,
    });
  } catch (error) {
    throw error;
  }
}

async function createUser({
  email,
  password,
  nickname,
}: {
  email: string;
  password: string;
  nickname: string;
}) {
  try {
    const auth = getAuth();

    if (!(await isNicknameAvailable(nickname))) {
      throw new Error("이미 존재하는 nickname 입니다.");
    }

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    await updateNickname(user, nickname);

    return { message: "success" };
  } catch (error: any) {
    if (error.message === "Firebase: Error (auth/email-already-in-use).") {
      return { message: "이미 존재하는 email 입니다." };
    }

    if (error.message === "이미 존재하는 nickname 입니다.") {
      return { message: "이미 존재하는 nickname 입니다." };
    }

    return error.message;
  }
}

async function signIn({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const auth = getAuth();

    const result = await signInWithEmailAndPassword(auth, email, password);

    const user = result.user;

    const nickname = await findNick(user);

    localStorage.setItem("nickname", nickname);
  } catch (error) {
    throw error;
  }
}

async function guestSignIn() {
  try {
    const auth = getAuth();
    const result = await signInAnonymously(auth);
    const user = result.user;

    await createGuestNick(user);
  } catch (error) {
    throw error;
  }
}

async function createGuestNick(user: User) {
  try {
    const users = collection(db, "users");
    const result = await getDocs(
      query(users, where("nickname", ">=", "guest"))
    );

    const guestNums = result.size;

    const nickname = `guest ${guestNums + 1}`;

    await updateNickname(user, nickname);
    localStorage.setItem("nickname", nickname);
  } catch (error) {
    throw error;
  }
}

async function findNick(user: User) {
  try {
    const users = collection(db, "users");
    const result = await getDocs(query(users, where("uid", "==", user.uid)));

    let nickname = "";

    result.docs.map((element) => {
      const data = element.data();
      nickname = data.nickname;
    });
    return nickname;
  } catch (error) {
    throw error;
  }
}

async function signOut() {
  try {
    const auth = getAuth();

    await auth.signOut();

    localStorage.removeItem("nickname");
  } catch (error) {
    throw error;
  }
}

export { createUser, signIn, guestSignIn, signOut };
