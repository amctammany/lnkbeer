import Link from "next/link";
import { SidebarTrigger } from "./ui/sidebar";
import { Button } from "./ui/button";

export type AppBarProps = {
  title?: React.ReactNode;
  children?: React.ReactNode;
};
export const AppBar = ({ title, children }: AppBarProps) => {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="" />
      <span className="flex-grow">{title}</span>
      {children}
    </header>
  );
};
