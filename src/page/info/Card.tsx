import React, { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";

function Card({
  standard,
  title,
  content,
  imgs,
}: {
  standard: number;
  title: string;
  content: string;
  imgs: string[];
}) {
  const [show, setShown] = useState(false);
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

  const animationStyle = useSpring({
    transform: show ? "scale(1.03)" : "scale(1)",
    boxShadow: show
      ? "0 20px 25px rgb(0 0 0 / 25%)"
      : "0 2px 10px rgb(0 0 0 / 8%)",
  });

  return (
    // @ts-ignore
    <animated.div
      style={animationStyle}
      onMouseEnter={() => setShown(true)}
      onMouseLeave={() => setShown(false)}
      className={`bg-white p-4 w-[400px] rounded-lg shadow-lg`}
    >
      <div className="relative">
        <img
          src={imgs[imgIndex]}
          alt=""
          className="w-full h-[200px] object-cover rounded-t-lg"
        />
        <div className="absolute bottom-0 left-0 bg-black text-white p-2 rounded-br-lg">
          <span>{title}</span>
        </div>
      </div>
      <div className="mt-4">
        <pre>{content}</pre>
      </div>
    </animated.div>
  );
}

export default Card;
