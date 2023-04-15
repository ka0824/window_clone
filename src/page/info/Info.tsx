import { useState, useEffect } from "react";
import Footer from "./Footer";
import Head from "./Head";
import Main from "./Main";
import Section from "./Section";
import useScrollPosition from "../../customHook/useScrollPostion";
import infoData from "../../data/infoData";
import { Link } from "react-router-dom";
import Loading from "../../component/Loading";

function Info() {
  const scrollPosition = useScrollPosition();

  return (
    <div className="min-h-screen flex flex-col">
      <Head></Head>
      <Main>
        {infoData.map((data, index) => {
          return (
            <Section
              scrollPosition={scrollPosition}
              standard={300 * index}
              src={data.src}
              title={data.title}
              content={data.content}
            ></Section>
          );
        })}
        <Link to="/service" className="w-full flex justify-center">
          <button className="rounded-full bg-zinc-600 px-2 text-white my-10 mx-auto w-72 h-24 text-4xl hover:bg-zinc-800">
            체험하기
          </button>
        </Link>
      </Main>
      <Footer></Footer>
    </div>
  );
}

export default Info;
