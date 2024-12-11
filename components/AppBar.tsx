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

export interface AppBarActionProps {
  text?: string;
  icon?: any;
  action?: any;
  type?: HTMLButtonElement["type"];
  url?: string;
  children?: any;
  items?: Omit<AppBarActionProps, "items">[];
}
export const AppBarAction = ({
  text,
  icon,
  action,
  children,
  type,

  url,
  items,
}: AppBarActionProps) => {
  const body = (
    <Button
      type={type ?? "button"}
      className="hover:bg-primary/20"
      key={text}
      size="sm"
      variant="secondary"
    >
      {icon}
      {text}
    </Button>
  );
  if (items && items.length > 0)
    return (
      <DropdownMenu>
        <DropdownMenuTrigger
          className="hover:bg-primary/20"
          asChild
          //variant="secondary"
        >
          <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-8 rounded-md px-3 text-xs bg-secondary text-secondary-foreground shadow-sm hover:bg-primary/20">
            {icon}
            {text}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{text}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {React.Children.map(children, (item) => (
            <DropdownMenuItem asChild key={item.text}>
              {item}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  return url ? <Link href={url}>{body}</Link> : body;
};

export interface AppBarProps {
  title?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  actions?: AppBarActionProps[];
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
