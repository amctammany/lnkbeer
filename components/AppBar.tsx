"use client";
import Link from "next/link";
import { SidebarTrigger, useSidebar } from "./ui/sidebar";
import { Button } from "./ui/button";
import clsx from "clsx";

export interface AppBarAction {
  text?: string;
  icon?: any;
  action?: any;
  type?: HTMLButtonElement["type"];
  url?: string;
}
export interface AppBarProps {
  title?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  actions?: AppBarAction[];
}
export const AppBar = ({
  //actions = [],
  title,
  className,
  children,
}: AppBarProps) => {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  return (
    <div className="group peer" data-state={state} data-ismobile={isMobile}>
      <header
        className={clsx(
          "flex h-16 shrink-0 items-center gap-2 border-b px-4 group-data-[state=expanded]:w-[calc(100%_-_var(--sidebar-width))] group-data-[state=collapsed]:w-[calc(100%_-_var(--sidebar-width-icon))]",
          className,
        )}
      >
        <SidebarTrigger className="" />
        <span className="flex-grow">{title}</span>
        {children}
      </header>
    </div>
  );
};
