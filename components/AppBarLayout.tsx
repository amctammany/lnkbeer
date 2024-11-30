import clsx from "clsx";
import { AppBar } from "./AppBar";

export type AppBarLayoutProps = {
  title?: string;
  className?: string;
  actions?: any;
  children?: React.ReactNode | React.ReactNode[];
};
export const AppBarLayout = ({
  title,
  actions,
  className,
  children,
}: AppBarLayoutProps) => (
  <div className="relative ">
    <div className="fixed bg-white h-16 w-full z-20">
      <AppBar title={title} actions={actions} />
    </div>
    <div className={clsx("mt-16 w-full", className)}>{children}</div>
  </div>
);
