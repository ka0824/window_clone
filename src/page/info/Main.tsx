import { ReactNode } from "react";

function Main({ children }: { children: ReactNode }) {
  return <div className="flex-1 flex flex-col">{children}</div>;
}

export default Main;
