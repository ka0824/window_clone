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
          ? "fade-in h-600px border-b-2 flex justify-center items-center"
          : "fade-out h-600px border-b-2 flex justify-center items-center"
      }
    >
      <div className="bg-white w-4/5 h-4/5 rounded-xl flex p-20">
        <img src={src} className="w-80 h-80 mr-40"></img>
        <div>
          <div className="text-4xl mb-8">{title}</div>
          <pre className="text-xl">{content}</pre>
        </div>
      </div>
    </section>
  );
}

export default Section;
