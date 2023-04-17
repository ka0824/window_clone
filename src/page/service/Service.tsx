import Loading from "../../component/Loading";
import LoginModal from "../../component/LoginModal";
import useLoading from "../../customHook/useLoading";
import TaskBar from "./Taskbar";
import useLogin from "../../customHook/useLogin";
import useModal from "../../customHook/useModal";
import IconList from "../../component/IconList";

function Service() {
  const isLoading = useLoading();
  const isLogin = useLogin();
  const [isShowLogin, handleCloseLogin] = useModal();

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="bg-window flex-1 service-main flex">
        {!isLogin && (
          <LoginModal
            isShow={isShowLogin}
            handleClose={() => handleCloseLogin()}
          ></LoginModal>
        )}
        <IconList></IconList>
      </div>
      <TaskBar></TaskBar>
    </div>
  );
}

export default Service;
