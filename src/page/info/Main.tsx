import { ReactNode } from "react";

function Main({ children }: { children: ReactNode }) {
  return (
    <main className="flex-1 flex flex-col w-full max-w-screen-xl mx-auto overflow-x-auto whitespace-nowrap px-4 sm:px-12 md:px-20 lg:px-32 xl:px-48 bg-white shadow-lg">
      {children}
    </main>
  );
}

export default Main;
