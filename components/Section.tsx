import Link from "next/link";
import { Button } from "./ui/button";
import { AppBarAction } from "./AppBar";
import { ComponentProps } from "react";
import clsx from "clsx";

export type SectionProps = {
  title?: string | React.ReactNode;
  actions?: AppBarAction[];
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
        <span className="flex-grow">{title}</span>
        {(actions ?? []).map((action) =>
          action.url ? (
            <Link key={action.url} href={action.url} scroll={false}>
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
      </div>
      <div className="flex-grow">{children}</div>
    </div>
  );
}

export default Section;
