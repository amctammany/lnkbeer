import Link from "next/link";
import { Button } from "./ui/button";
import React from "react";

export interface AppBarItemProps {
  text?: string;
  icon?: any;
  action?: any;
  type?: HTMLButtonElement["type"];
  url?: string;
}
export const AppBarItem = ({
  text,
  icon,
  action,
  type,

  url,
}: AppBarItemProps) => {
  const body = (
    <Button
      type={type ?? "button"}
      className="hover:bg-primary/20 [&_svg]:size-6 lg:[&_svg]:size-6 p-1 lg:p-2 m-1 "
      key={text}
      variant="secondary"
      {...(action ? { onClick: action } : {})}
    >
      {icon}
      <span className="hidden text-sm lg:text-lg truncate sm:block">
        {text}
      </span>
    </Button>
  );
  return url ? <Link href={url}>{body}</Link> : body;
};
