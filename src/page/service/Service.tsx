import Loading from "../../component/Loading";
import useLoading from "../../customHook/useLoading";

function Service() {
  const isLoading = useLoading();

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <div>서비스 페이지 입니다.</div>
    </div>
  );
}

export default Service;
