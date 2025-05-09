import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import Link from "next/link";
import { ComponentProps } from "react";

export type ListItemProps = VariantProps<typeof listItemStyles> &
  ComponentProps<"div"> & {
    children?: React.ReactNode;
    href?: string;
    innerClassName?: string;
    //secondaryAction?: any;
    //actions?: React.ReactNode | React.ReactNode[];
    scroll?: boolean;
  };
const listItemInnerStyles = cva(["px-0 py-0 flex items-center grow"], {
  variants: {
    variant: {
      default: ["group-hover:bg-primary-500/10"],
      warning: ["group-hovr:bg-warning-500/10"],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const listItemStyles = cva(["group relative box-border justify-start w-full"], {
  variants: {
    variant: {
      default: [
        "bg-white hover:bg-primary-500/10 p-2 even:bg-primary-foreground even:hover:bg-slate-500/10 odd:bg-slate-200 odd:hover:bg-slate-500/10",
      ],
      warning: ["group-hover:bg-warning-500/10 bg-warning-200"],
      //default: [""],
      //warning: [""],
    },
    border: {
      none: [""],
      black: [
        "border-2 border-spacing-2 not-last-of-type:border-b-0 border-black",
      ],
      red: ["border-2 border-spacing-2 not-last-of-type:border-b-0 border-red"],
    },
  },
  defaultVariants: {
    variant: "default",
    border: "none",
  },
});

export const ListItem = ({
  href,
  scroll,
  //actions,
  //onClick,
  children,
  variant,
  border,
  innerClassName,
  className,
  style,
}: ListItemProps) => {
  const cn = clsx(listItemInnerStyles({ variant }), innerClassName);
  const child = href ? (
    <Link
      //{...props}
      href={href}
      scroll={scroll ?? false}
      className={cn}
    >
      {children}
    </Link>
  ) : (
    <div className={cn}>{children}</div>
  );

  return (
    <li
      style={style}
      className={clsx(listItemStyles({ variant, border }), className)}
    >
      {child}
    </li>
  );
};
