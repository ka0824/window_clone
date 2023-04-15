import { useState, useEffect } from "react";
import Modal from "react-modal";
import Loading from "../../component/Loading";
import LoginModal from "../../component/LoginModal";
import useLoading from "../../customHook/useLoading";
import TaskBar from "./Taskbar";
import useLogin from "../../customHook/useLogin";
import useModal from "../../customHook/useModal";

function Service() {
  const isLoading = useLoading();
  const isLogin = useLogin();
  const [isShowLogin, handleCloseLogin] = useModal();

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="bg-window flex-1 service-main">
        {!isLogin && (
          <LoginModal
            isShow={isShowLogin}
            handleClose={handleCloseLogin}
          ></LoginModal>
        )}
      </div>
      <TaskBar></TaskBar>
    </div>
  );
}

export default Service;
