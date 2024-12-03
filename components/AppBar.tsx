import Link from "next/link";
import { SidebarTrigger } from "./ui/sidebar";
import { Button } from "./ui/button";
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
      {actions.map((action) =>
        action.url ? (
          <Button key={action.url} asChild size="sm" variant="secondary">
            <Link href={action.url}>
              {action.icon && <action.icon />}
              {action.text}
            </Link>
          </Button>
        ) : (
          <Button
            type={action.type ?? "button"}
            key={action.text}
            size="sm"
            variant="secondary"
          >
            {action.icon && <action.icon />}
            {action.text}
          </Button>
        ),
      )}
    </header>
  );
};
