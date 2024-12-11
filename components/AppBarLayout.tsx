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
    <div className="relative w-full ">
      <AppBar title={title} className="fixed bg-white  h-16 z-20">
        {actions.map((action) =>
          action.url ? (
            <Link key={action.url} href={action.url}>
              <Button
                className="hover:bg-primary/20"
                size="sm"
                variant="secondary"
              >
                {action.icon && <action.icon />}
                {action.text}
              </Button>
            </Link>
          ) : (
            <Button
              type={action.type ?? "button"}
              className="hover:bg-primary/20"
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

      <div className={clsx("mt-16 ", className)}>{children}</div>
    </div>
  );
};
