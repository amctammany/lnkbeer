import clsx from "clsx";
import { AppBar } from "./AppBar";

export type AppBarLayoutProps = {
  title?: string;
  className?: string;
  actions?: React.ReactNode | React.ReactNode[]; //AppBarItemProps[];
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
        {actions}
      </AppBar>

      <div className={clsx("mt-16 ", className)}>{children}</div>
    </div>
  );
};
