"use client";
import { SidebarTrigger, useSidebar } from "./ui/sidebar";
import clsx from "clsx";
import React from "react";

export interface AppBarProps {
  title?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  //actions?: AppBarItemProps[];
}
export const AppBar = ({
  //actions = [],
  title,
  className,
  children,
}: AppBarProps) => {
  const { isMobile, openMobile, open, state } = useSidebar();

  const tit =
    typeof title === "string" ? (
      <span className="grow truncate">{title}</span>
    ) : (
      title
    );
  return (
    <div
      className="group peer relative w-full"
      data-open={isMobile ? openMobile : open}
      data-state={state}
      data-ismobile={isMobile}
    >
      <header
        className={clsx(
          "flex h-10 shrink-0 items-center gap-1 lg:gap-2 border-b pr-4 w-full lg:group-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-36px)] md:group-data-[state=expanded]:w-[calc(100%_-_var(--sidebar-width))] group-data-[open=false]:w-fll transition-[width] ease-linear duration-50",
          className,
        )}
      >
        <div className="h-10 grid aspect-square bg-gray-800/20 ">
          <SidebarTrigger
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              return false;
            }}
            variant="ghost"
            className="m-auto "
            type="button"
          />
        </div>
        {tit}
        {children}
      </header>
    </div>
  );
};
