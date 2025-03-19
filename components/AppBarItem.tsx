import Link from "next/link";
import { Button } from "./ui/button";
import React from "react";
import {
  TooltipContent,
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
} from "./ui/tooltip";

export interface AppBarItemProps {
  text?: string;
  disabled?: boolean;
  icon?: any;
  action?: any;
  type?: HTMLButtonElement["type"];
  url?: string;
}
export const AppBarItem = ({
  text,
  disabled = false,
  icon,
  action,
  type,

  url,
}: AppBarItemProps) => {
  const body = (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type={type ?? "button"}
            className="hover:bg-primary/20 [&_svg]:size-6 sm:[&_svg]:size-4 p-1 lg:p-2 m-1 "
            disabled={disabled}
            key={text}
            aria-label={text}
            variant="secondary"
            {...(action ? { onClick: action } : {})}
          >
            {icon}
            <span className="hidden text-sm lg:text-md truncate sm:block">
              {text}
            </span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>{text}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
  return url ? <Link href={url}>{body}</Link> : body;
};
