import { useState } from "react";
import Modal from "react-modal";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { LoginForm, SignUpForm } from "../types";
import { createUser, guestSignIn, signIn } from "../firebase/firebaseAuth";

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

// 회원 가입할 때에 렌더링되는 컴포넌트 입니다.
// react-hook-form을 사용하고 있습니다.

function SignUp({
  setShowSignUp,
}: {
  setShowSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpForm>();
  const [error, setError] = useState("");

  function forbiddenNick(value: string) {
    if (value.includes("guest")) {
      return false;
    }

    return true;
  }

  // 회원 정보 입력의 유효성 검사는 통과했으나, 값이 중복될 때를 오류를 알리는 과정을 포함합니다.
  const onSubmit: SubmitHandler<SignUpForm> = async (data) => {
    const result = await createUser(data);

    if (result.message === "이미 존재하는 email 입니다.") {
      setError("이미 존재하는 email 입니다.");
    } else if (result.message === "이미 존재하는 nickname 입니다.") {
      setError("이미 존재하는 nickname 입니다.");
    } else {
      setShowSignUp(false);
    }
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col mb-4">
        <div className="flex items-center mb-2">
          <label htmlFor="email" className="w-24 mr-2 text-gray-600">
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
              <input
                className="flex-1 border-b-2 focus:outline-none focus:border-blue-500"
                placeholder="이메일을 입력해주세요"
                {...field}
              />
            )}
          />
        </div>
        {errors.email && errors.email.type === "required" && (
          <p className="text-red-600 mb-2">E-mail을 입력해주세요.</p>
        )}
        {errors.email && errors.email.type === "pattern" && (
          <p className="text-red-600 mb-2">올바른 E-mail을 입력해 주세요.</p>
        )}
      </div>
      <div className="flex items-center mb-4">
        <label htmlFor="nickname" className="w-24 mr-2 text-gray-600">
          Nickname
        </label>
        <Controller
          name="nickname"
          control={control}
          defaultValue=""
          rules={{
            required: true,
            pattern: /^(?=.*[a-zA-Z가-힣])(?=.*\d)[a-zA-Z가-힣\d]{4,12}$/,
            minLength: 4,
            maxLength: 12,
            validate: forbiddenNick,
          }}
          render={({ field }) => (
            <input
              className="flex-1 border-b-2 focus:outline-none focus:border-blue-500"
              placeholder="닉네임을 입력해주세요"
              {...field}
            />
          )}
        />
      </div>
      {errors.nickname && errors.nickname.type === "required" && (
        <p className="text-red-600 mb-2">Nickname을 입력해주세요.</p>
      )}
      {errors.nickname && errors.nickname.type === "pattern" && (
        <p className="text-red-600 mb-2">올바른 Nickname을 입력해주세요.</p>
      )}
      {errors.nickname &&
        (errors.nickname.type === "minLength" ||
          errors.nickname.type === "maxLength") && (
          <p className="text-red-600 mb-2">
            Nickname은 4~ 10자로 만들어 주세요.
          </p>
        )}
      {errors.nickname && errors.nickname.type === "validate" && (
        <p className="text-red-600 mb-2">Guest는 사용할 수 없습니다.</p>
      )}
      <div className="flex items-center mb-4">
        <label htmlFor="password" className="w-24 mr-2 text-gray-600">
          Password
        </label>
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{ required: true, minLength: 8, maxLength: 20 }}
          render={({ field }) => (
            <input
              className="flex-1 border-b-2 focus:outline-none focus:border-blue-500"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              {...field}
            />
          )}
        />
      </div>
      {errors.password && errors.password.type === "required" && (
        <p className="text-red-600 mb-2">암호를 입력해주세요.</p>
      )}
      {errors.password &&
        (errors.password.type === "minLength" ||
          errors.password.type === "maxLength") && (
          <p className="text-red-600 mb-2">암호는 8~ 20자로 만들어 주세요.</p>
        )}
      <div className="flex items-center mb-4">
        <label htmlFor="confirm-password" className="w-24 mr-2 text-gray-600">
          Confirm Password
        </label>
        <Controller
          name="confirmPassword"
          control={control}
          defaultValue=""
          rules={{
            required: true,
            validate: (value) => {
              return (
                value === watch("password", "") ||
                "비밀번호가 일치하지 않습니다."
              );
            },
          }}
          render={({ field }) => (
            <input
              className="flex-1 border-b-2 focus:outline-none focus:border-blue-500"
              type="password"
              placeholder="비밀번호를 다시 입력해주세요"
              {...field}
            />
          )}
        />
      </div>
      {errors.confirmPassword && errors.confirmPassword.type === "required" && (
        <p className="text-red-600 mb-2">비밀번호 확인을 입력해 주세요.</p>
      )}
      {errors.confirmPassword && errors.confirmPassword.type === "validate" && (
        <p className="text-red-600 mb-2">{errors.confirmPassword.message}</p>
      )}
      {error !== "" && <p className="text-red-600 mb-2">{error}</p>}
      <div className="flex justify-end">
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-6 rounded-md mr-2"
          onClick={() => setShowSignUp(false)}
        >
          취소
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md"
          type="submit"
        >
          회원가입
        </button>
      </div>
    </form>
  );
}

// 로그인할 때에 렌더링되는 컴포넌트 입니다.
// react-hook-form 라이브러리를 사용하고 있습니다.

function Login({ setShowSignUp }: { setShowSignUp: Function }) {
  const { control, handleSubmit } = useForm<LoginForm>();

  const onLogin = async (data: LoginForm) => {
    await signIn(data);
  };

  const onGuest = async () => {
    await guestSignIn();
  };

  return (
    <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onLogin)}>
      <div className="flex items-center">
        <label htmlFor="email" className="w-24 mr-2 text-gray-600">
          E-mail
        </label>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <input
              className="flex-1 border-b-2 focus:outline-none focus:border-blue-500"
              placeholder="이메일을 입력해주세요."
              {...field}
            />
          )}
        />
      </div>
      <div className="flex items-center">
        <label htmlFor="password" className="w-24 mr-2 text-gray-600">
          Password
        </label>
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <input
              className="flex-1 border-b-2 focus:outline-none focus:border-blue-500"
              type="password"
              placeholder="비밀번호를 입력해주세요."
              {...field}
            />
          )}
        />
      </div>
      <div className="flex justify-end items-center">
        <button
          className="text-sm text-gray-600 hover:text-gray-800 mr-2"
          onClick={() => setShowSignUp(true)}
        >
          <span className="inline-block border-b border-transparent hover:border-gray-600 transition-colors duration-300">
            회원가입
          </span>
        </button>
        <button
          className="text-sm text-gray-600 hover:text-gray-800 mr-2"
          onClick={onGuest}
        >
          <span className="inline-block border-b border-transparent hover:border-gray-600 transition-colors duration-300">
            임시 로그인
          </span>
        </button>
        <button
          className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition-all duration-300"
          type="submit"
        >
          로그인
        </button>
      </div>
    </form>
  );
}

// 로그인 관련 모달을 다루는 컴포넌트 입니다.
// showSignUp의 값에 따라 회원 가입 컴포넌트의 렌더링 여부가 결정됩니다.

function LoginModal({ isShow }: { isShow: boolean }) {
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <Modal
      isOpen={isShow}
      style={customStyles}
      overlayClassName="custom-overlay"
    >
      {showSignUp ? (
        <SignUp setShowSignUp={setShowSignUp}></SignUp>
      ) : (
        <Login setShowSignUp={setShowSignUp}></Login>
      )}
    </Modal>
  );
}

export default LoginModal;
