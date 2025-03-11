import { ComponentProps } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { SchemaFieldError } from "@/lib/validateSchema";
import clsx from "clsx";

export type InputProps = {
  name?: string;
  label?: string | React.ReactNode;
  suffix?: string | React.ReactNode;
  defaultValue?: any;
  disabled?: boolean;
  error?: SchemaFieldError;
  //onChange?: (e: SyntheticEvent) => void;
  //onBlur?: (e: SyntheticEvent) => void;
  value?: any;
  ref?: any;
} & ComponentProps<"input"> &
  VariantProps<typeof inputStyles>;

export const inputStyles = cva(
  //"disabled:bg-slate-50 disabled:shadow-none disabled:text-slate-500 disabled:border-slate-200",

  "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-hidden invalid:ring-destructive disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ",

  {
    variants: {
      variant: {
        error: [
          "border-2 border-red-500 focus-visible:ring-1 focus-visible:ring-destructive",
        ],
        inline: ["inline-block"],
        default: ["block focus-visible:ring-1 focus-visible:ring-ring "],
      },
      inputSize: {
        default: [],
        full: ["w-full"],
        small: ["w-8"],
      },
      suffixV: {
        default: [""],
        error: ["border-2 border-r-0 rounded-r-none border-destructive"],
        active: ["border-r-0 rounded-r-none"],
      },
    },
    defaultVariants: {
      inputSize: "default",
      variant: "default",
      suffixV: "default",
    },
  },
);
export function Input({
  //name,
  //onChange,
  //onBlur,
  //value,
  error,
  className,
  //disabled,
  label,
  suffix,
  //defaultValue,
  variant,
  inputSize,
  //ref,
  ...props
}: InputProps) {
  return (
    <input
      className={clsx(
        inputStyles({
          variant: error ? "error" : variant,
          inputSize,
          //suffixV: suffix ? (error ? "error" : "active") : "default",
        }),
        className,
      )}
      type={props.type ?? "text"}
      {...props}
    />
  );
}
