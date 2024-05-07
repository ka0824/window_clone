import React from "react";
import { Link } from "react-router-dom";
import Carousel3D from "./Carousel3D";
import Card from "./Card";
import Main from "./Main";
import useScrollPosition from "../../customHook/useScrollPostion";
import infoData from "../../data/infoData";
import Footer from "./Footer";
import Head from "./Head";

function Info() {
  const scrollPosition = useScrollPosition();

  const cards = infoData.map((data, index) => {
    return {
      key: `section-${index}`,
      content: (
        <Card
          key={`section-${index}`}
          standard={300 * index}
          imgs={data.imgs}
          title={data.title}
          content={data.content}
        />
      ),
    };
  });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-gray-100 to-gray-200">
      <Head />
      <Main>
        <Carousel3D
          cards={cards}
          height="660px"
          width="100%"
          margin="0 auto"
          offset={10}
          showArrows={false}
        />
        <div className="w-full max-w-screen-xl mx-auto mt-8 border-t-2 border-gray-300"></div>
        <div className="flex justify-center mt-8">
          <Link to="/service" className="inline-block">
            <button className="rounded-full bg-blue-300 px-6 py-3 text-white text-2xl hover:bg-blue-400 hover:shadow-lg transition-all duration-300">
              체험하기
            </button>
          </Link>
        </div>
      </Main>
      <Footer />
    </div>
  );
}

export default Info;
