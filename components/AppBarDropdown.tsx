import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import React from "react";
import { ChevronDown } from "lucide-react";
export interface AppBarDropdownItemProps {
  text?: string;
  icon?: any;
  action?: any;
  url?: string;
}
export const AppBarDropdownItem = ({
  text,
  icon,
  action,
  url,
}: AppBarDropdownItemProps) => {
  const body = (
    <>
      {icon}
      <span>{text}</span>
    </>
  );
  return url ? (
    <DropdownMenuItem className="w-full" key={text}>
      <Link href={url}>{body}</Link>
    </DropdownMenuItem>
  ) : (
    <DropdownMenuItem onClick={action} className="w-full" key={text}>
      {body}
    </DropdownMenuItem>
  );
};

export interface AppBarDropdownProps {
  text?: string;
  icon?: any;
  children?: any;
}
export const AppBarDropdown = ({
  text,
  icon,
  children,
}: AppBarDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:bg-primary/20" asChild>
        <Button variant="secondary">
          {icon}
          <span>{text}</span>
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{text}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
