function Section({
  scrollPosition,
  standard,
  title,
  content,
  src,
}: {
  scrollPosition: number;
  standard: number;
  title: string;
  content: string;
  src: string;
}) {
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
          <div className="flex justify-center mx-auto bg-red-50">
            <img src={src} className="w-80 h-80 hidden sm:block"></img>
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
