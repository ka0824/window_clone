import { useState, useEffect } from "react";

function Section({
  scrollPosition,
  standard,
  title,
  content,
  imgs,
}: {
  scrollPosition: number;
  standard: number;
  title: string;
  content: string;
  imgs: string[];
}) {
  const [imgIndex, setImgIndex] = useState(0);

  function changeIndex(prevIndex: number) {
    if (prevIndex >= imgs.length - 1) {
      return 0;
    }
    return prevIndex + 1;
  }

  useEffect(() => {
    const intervalIdx = setInterval(() => {
      setImgIndex((prevIndex) => changeIndex(prevIndex));
    }, 1000);

    return () => {
      clearInterval(intervalIdx);
    };
  }, []);

  return (
    <section
      className={
        scrollPosition >= standard
          ? "fade-in border-b-2 flex justify-center items-center w-full min-h-min mt-2 mb-2"
          : "fade-out border-b-2 flex justify-center items-center w-full min-h-min mt-2 mb-2"
      }
    >
      <div className="flex p-20 w-full mb-2 justify-center">
        <div className="bg-white rounded-xl flex py-20 w-4/5 flex-wrap">
          <div className="flex justify-center mx-auto mb-8">
            <img
              src={imgs[imgIndex]}
              className="hidden sm:block px-10 w-200 h-96"
              alt=""
            />
          </div>
          <div className="flex flex-col justify-center items-center max-w-fit mx-auto">
            <div className="text-4xl mb-8 w-full text-center">{title}</div>
            <pre className="text-xl">{content}</pre>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Section;
