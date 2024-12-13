//import Link from "next/link";
//import { Button } from "./ui/button";
//import { AppBarItemProps } from "./AppBarItem";
import { ComponentProps } from "react";
import clsx from "clsx";

export type SectionProps = {
  title?: string | React.ReactNode;
  actions?: any; //AppBarItemProps[];
  children?: string | React.ReactNode | React.ReactNode[];
} & ComponentProps<"div">;
export function Section({
  title,
  children,
  actions,
  className,
  ...props
}: SectionProps) {
  return (
    <div
      className={clsx("m-2 border-2 flex flex-col rounded-sm ", className)}
      {...props}
    >
      <div
        className={clsx("flex-shrink p-2 flex bg-slate-300", {
          hidden: title === undefined,
        })}
      >
        <span className="flex-grow my-auto font-extrabold text-xl px-2">
          {title}
        </span>
        {actions}
      </div>
      <div className="flex-grow">{children}</div>
    </div>
  );
}

export default Section;
