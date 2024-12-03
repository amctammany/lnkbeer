import clsx from "clsx";
import { AppBar, AppBarAction } from "./AppBar";

export type AppBarLayoutProps = {
  title?: string;
  className?: string;
  actions?: AppBarAction[];
  children?: React.ReactNode | React.ReactNode[];
};
export const AppBarLayout = ({
  title,
  actions,
  className,
  children,
}: AppBarLayoutProps) => (
  <div className="relative w-full">
    <AppBar
      title={title}
      actions={actions}
      className="fixed bg-white left-[240px] right-0 h-16 z-20"
    />
    <div className={clsx("mt-16 w-full", className)}>{children}</div>
  </div>
);
