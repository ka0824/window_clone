import { useState, useRef } from "react";
import Modal from "react-modal";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { LoginForm, SignUpForm } from "../types";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInAnonymously,
} from "firebase/auth";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function SignUp({ setIsSignUp }: { setIsSignUp: Function }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpForm>();
  const password = useRef<string | null>(null);
  const auth = getAuth();
  const onSubmit: SubmitHandler<SignUpForm> = (data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .then(() => {
        setIsSignUp(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <div className="flex ">
          <label htmlFor="email" className="w-24">
            E-mail
          </label>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: true,
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            }}
            render={({ field }) => (
              <input className="w-36 border-b-2 mb-2" {...field} />
            )}
          />
        </div>
        {errors.email && errors.email.type === "required" && (
          <p className="text-rose-500 bg-rose-100 py-1 px-2 rounded-xl mb-2">
            E-mail을 입력해주세요.
          </p>
        )}
        {errors.email && errors.email.type === "pattern" && (
          <p className="text-rose-500 bg-rose-100 py-1 px-2 rounded-xl mb-2">
            올바른 E-mail을 입력해 주세요.
          </p>
        )}
      </div>
      <div className="flex flex-col">
        <div className="flex">
          <label htmlFor="password" className="w-24">
            Password
          </label>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: true, minLength: 8, maxLength: 20 }}
            render={({ field }) => (
              <input
                className="w-36 border-b-2 mb-2"
                type="password"
                {...field}
              />
            )}
          />
        </div>
        {errors.password && errors.password.type === "required" && (
          <p className="text-rose-500 bg-rose-100 py-1 px-2 rounded-xl mb-2">
            암호는 8~ 20자로 만들어 주세요.
          </p>
        )}
        {errors.password &&
          (errors.password.type === "minLength" ||
            errors.password.type === "maxLength") && (
            <p className="text-rose-500 bg-rose-100 py-1 px-2 rounded-xl mb-2">
              암호는 8~ 20자로 만들어 주세요.
            </p>
          )}
      </div>
      <div className="flex relative flex-col">
        <div className="flex flex-col">
          <div className="flex items-center">
            <label htmlFor="confirm-password" className="w-24">
              Confirm Password
            </label>
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                validate: (value) => {
                  console.log("password", password.current);
                  return (
                    value === watch("password", "") ||
                    "비밀번호가 일치하지 않습니다."
                  );
                },
              }}
              render={({ field }) => (
                <input
                  className="w-36 border-b-2 mb-2"
                  type="password"
                  {...field}
                />
              )}
            ></Controller>
          </div>
          {errors.confirmPassword &&
            errors.confirmPassword.type === "required" && (
              <p className="text-rose-500 bg-rose-100 py-1 px-2 rounded-xl mb-2">
                비밀번호 확인란을 입력해 주세요.
              </p>
            )}
          {errors.confirmPassword &&
            errors.confirmPassword.type === "validate" && (
              <p className="text-rose-500 bg-rose-100 py-1 px-2 rounded-xl mb-2">
                {errors.confirmPassword.message}
              </p>
            )}
        </div>
      </div>
      <div className="flex mt-2 justify-end">
        <button
          className="bg-stone-300 hover:bg-stone-500 px-2 py-1 rounded-xl mr-2"
          onClick={() => setIsSignUp(false)}
        >
          돌아가기
        </button>
        <button className="bg-slate-300 hover:bg-slate-500 px-2 py-1 rounded-xl mr-2">
          회원 가입
        </button>
      </div>
    </form>
  );
}

function Login({ setIsSignUp }: { setIsSignUp: Function }) {
  const { control, handleSubmit } = useForm<LoginForm>();
  const auth = getAuth();

  const onLogin = (data: LoginForm) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userEmail = user.email || "";

        localStorage.setItem("userEmail", userEmail);
        window.dispatchEvent(new Event("storage"));
        console.log("로그인 성공!", user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`로그인 실패! (${errorCode}): ${errorMessage}`);
      });
    return data;
  };

  const onGuest = () => {
    signInAnonymously(auth)
      .then((userCredential) => {
        const user = userCredential.user;
        const userEmail = user.email || "";
        localStorage.setItem("userEmail", userEmail);
        window.dispatchEvent(new Event("storage"));
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onLogin)}>
      <div className="flex">
        <label htmlFor="email" className="w-24">
          E-mail
        </label>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <input className="w-36 border-b-2 mb-2" {...field} />
          )}
        />
      </div>
      <div className="flex">
        <label htmlFor="password" className="w-24">
          Password
        </label>
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <input
              className="w-36 border-b-2 mb-2"
              type="password"
              {...field}
            />
          )}
        />
      </div>
      <div className="flex mt-2 justify-end">
        <button
          className="bg-slate-300 hover:bg-slate-500 px-2 py-1 rounded-xl mr-2"
          onClick={() => setIsSignUp(true)}
        >
          회원 가입
        </button>
        <button
          className="bg-stone-300 hover:bg-stone-500 px-2 py-1 rounded-xl mr-2"
          onClick={onGuest}
        >
          임시 로그인
        </button>
        <button
          className="bg-blue-300 hover:bg-blue-500 px-2 py-1 rounded-xl"
          type="submit"
        >
          로그인
        </button>
      </div>
    </form>
  );
}

function LoginModal({
  isShow,
  handleClose,
}: {
  isShow: boolean;
  handleClose: Function;
}) {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <Modal isOpen={isShow} style={customStyles}>
      {isSignUp ? (
        <SignUp setIsSignUp={setIsSignUp}></SignUp>
      ) : (
        <Login setIsSignUp={setIsSignUp}></Login>
      )}
    </Modal>
  );
}

export default LoginModal;