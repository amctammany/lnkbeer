import Link from "next/link";
import { SidebarTrigger } from "./ui/sidebar";
import { Button } from "./ui/button";
import clsx from "clsx";

export interface AppBarAction {
  text?: string;
  icon?: any;
  action?: any;
  url?: string;
}
export interface AppBarProps {
  title?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  actions?: AppBarAction[];
}
export const AppBar = ({
  actions = [],
  title,
  className,
  children,
}: AppBarProps) => {
  return (
    <header
      className={clsx(
        "flex h-16 shrink-0 items-center gap-2 border-b px-4",
        className,
      )}
    >
      <SidebarTrigger className="" />
      <span className="flex-grow">{title}</span>
      {children}
      {actions.map((action) => (
        <Button key={action.text} size="sm" variant="secondary">
          {action.icon && <action.icon />}
          {action.text}
        </Button>
      ))}
    </header>
  );
};
