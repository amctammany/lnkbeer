import Link from "next/link";
import { SidebarTrigger } from "./ui/sidebar";
import { Button } from "./ui/button";

export interface AppBarAction {
  text?: string;
  icon?: any;
  action?: any;
  url?: string;
}
export interface AppBarProps {
  title?: React.ReactNode;
  children?: React.ReactNode;
  actions?: AppBarAction[];
}
export const AppBar = ({ actions = [], title, children }: AppBarProps) => {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
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
