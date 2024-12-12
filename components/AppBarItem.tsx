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
      className="hover:bg-primary/20"
      key={text}
      size="sm"
      variant="secondary"
      {...(action ? { onClick: action } : {})}
    >
      {icon}
      <span className="hidden truncate sm:block">{text}</span>
    </Button>
  );
  return url ? <Link href={url}>{body}</Link> : body;
};
