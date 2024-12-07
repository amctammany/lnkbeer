"use client";
import { SidebarTrigger, useSidebar } from "./ui/sidebar";
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
  const { isMobile, openMobile, open, state } = useSidebar();

  return (
    <div
      className="group peer relative w-full"
      data-open={isMobile ? openMobile : open}
      data-state={state}
      data-ismobile={isMobile}
    >
      <header
        className={clsx(
          "flex h-16 shrink-0 items-center gap-2 border-b px-4 w-full lg:group-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-36px)] md:group-data-[state=expanded]:w-[calc(100%_-_var(--sidebar-width))] group-data-[open=false]:w-fll transition-[width] ease-linear duration-50",
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
