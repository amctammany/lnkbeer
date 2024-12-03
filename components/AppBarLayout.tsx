import clsx from "clsx";
import { AppBar, AppBarAction } from "./AppBar";
import { Button } from "./ui/button";
import Link from "next/link";

export type AppBarLayoutProps = {
  title?: string;
  className?: string;
  actions?: AppBarAction[];
  children?: React.ReactNode | React.ReactNode[];
};
export const AppBarLayout = ({
  title,
  actions = [],
  className,
  children,
}: AppBarLayoutProps) => {
  return (
    <div className="relative w-full group">
      <AppBar title={title} className="fixed bg-white  h-16 z-20">
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
      </AppBar>

      <div className={clsx("mt-16 w-full", className)}>{children}</div>
    </div>
  );
};
