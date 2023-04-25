import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
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

/**
 * 현재 닉네임이 데이터 베이스 내에 존재하는지 확인합니다.
 * 존재하지 않는다면 false, 존재한다면 true를 반환합니다.
 * @param {string} nickname - 닉네임
 * @returns {Promise<Boolean>}
 */

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

/**
 * 유저의 닉네임을 데이터 베이스에 등록합니다.
 * firebase의 authentication에서는 nickname을 따로 관리하지 않기 때문에 users 콜렉션에 uid, nickname을 따로 저장합니다.
 * 아무 값도 반환하지 않습니다.
 * @param user {Object} 회원가입된 유저의 정보
 * @param nickname {string} 닉네임
 * @return {Promise<void>}
 */

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

/**
 * 회원가입을 진행합니다.
 * 만약 입력한 닉네임이 데이터베이스에 존재할 경우, "이미 존재하는 닉네임 입니다." 문자열을 반환합니다.
 * 입력한 이메일이 데이터베이스에 존재할 경우, "아미 존재하는 email 입니다." 문자열을 반환합니다.
 * 회원가입에 성공했을 경우, 입력한 닉네임을 이후 업데이트 합니다.
 * 성공했을 경우, "success" 문자열을 반환합니다.
 * @param param - 회원가입으로 입력한 정보 객체
 * @param param.email - 회원가입 이메일
 * @param param.password - 회원가입 비밀번호
 * @param param.nickname - 회원가입 닉네임
 * @returns {Promise<Object>} - 처리 결과를 message에 담은 객체
 */

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

    if (await isNicknameAvailable(nickname)) {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      await updateNickname(user, nickname);

      return { message: "success" };
    } else {
      return { message: "이미 존재하는 nickname 입니다." };
    }
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

/**
 * 로그인을 진행합니다.
 * firebase의 authentication에 닉네임이 저장되어 있지 않기 때문에, 로그인 이후 저장된 닉네임을 찾아옵니다.
 * 아무 값도 반환하지 않습니다.
 * @param param - 로그인 하기 위해 입력한 정보
 * @param param.email - 입력한 이메일
 * @param param.password - 입력한 비밀번호
 * @returns {Promise<void>}
 */

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

/**
 * 임시 로그인을 진행합니다.
 * 로그인과 같이 우선 임시로그인을 진행한 이후 nickname을 생성합니다.
 * 인자가 필요하지 않습니다.
 * 아무 값도 반환하지 않습니다.
 * @returns {Promise<void>}
 */

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

/**
 * 임시 로그인을 했을 때에 닉네임을 생성합니다.
 * 현재 데이터 베이스에 guest 문자열을 포함하는 닉네임이 몇 개인지 확인합니다.
 * `guest ${찾은 갯수 + 1}`의 형태로 닉네임을 생성합니다.
 * 생성한 닉네임을 localStorage에 저장합니다.
 * 아무 값을 반환하지 않습니다.
 * @param user - 임시 로그인한 유저의 정보를 담은 객체
 * @return {Promise<void>}
 */

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

/**
 * 현재 로그인된 유저의 닉네임을 찾습니다.
 * 찾은 닉네임 문자열을 반환합니다.
 * @param user - 현재 로그인한 유저의 정보를 담은 객체
 * @returns {Promise{string}} - 현재 로그인한 유저의 닉네임
 */

async function findNick(user: User) {
  try {
    const users = collection(db, "users");
    const result = await getDocs(query(users, where("uid", "==", user.uid)));

    let nickname = "";

    result.docs.forEach((element) => {
      const data = element.data();
      nickname = data.nickname;
    });
    return nickname;
  } catch (error) {
    throw error;
  }
}

/**
 * 로그아웃 합니다.
 * 로그아웃 이후 localStorage에 저장된 nickname을 삭제합니다.
 * 아무런 인자가 필요하지 않습니다.
 * 아무 값도 반환하지 않습니다.
 * @returns {Promise<void>}
 */

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
