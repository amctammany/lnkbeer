"use client";
import Link from "next/link";
import { SidebarTrigger, useSidebar } from "./ui/sidebar";
import clsx from "clsx";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import React from "react";
import { Separator } from "@radix-ui/react-separator";

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
      <span className="flex-grow">{title}</span>
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
          "flex h-10 shrink-0 items-center gap-2 border-b pr-4 w-full lg:group-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-36px)] md:group-data-[state=expanded]:w-[calc(100%_-_var(--sidebar-width))] group-data-[open=false]:w-fll transition-[width] ease-linear duration-50",
          className,
        )}
      >
        <div className="h-10 grid aspect-square border-r-2 border-b-2 border-black ">
          <SidebarTrigger variant="ghost" className="m-auto " />
        </div>
        {tit}
        {children}
      </header>
    </div>
  );
};
