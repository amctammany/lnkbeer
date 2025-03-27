"use client";
import { ComponentProps, SyntheticEvent } from "react";
import { Label } from "./Label";
import { VariantProps, cva } from "class-variance-authority";
import { SchemaFieldError } from "@/lib/validateSchema";
//import { inputStyles } from "./Input";
import clsx from "clsx";

//type ErrorType = {
//type: string;
//path: string;
//message?: string;
//};
export type SelectProps = {
  name: string;
  label?: string | React.ReactNode;
  includeBlank?: boolean;
  error?: SchemaFieldError;
  defaultValue?: any;
  disabled?: boolean;
  children?: React.ReactNode | React.ReactNode[];
  options?: Record<string | number, string | number>;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;

  //onChange?: (e: SyntheticEvent) => void;
  onBlur?: (e: SyntheticEvent) => void;
  value?: any;
  ref?: any;
} & VariantProps<typeof selectStyles> &
  ComponentProps<"select">;
const selectStyles = cva("w-full", {
  variants: {
    variant: {
      default: [
        "block text-sm font-medium",
        "relative max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        "*:rounded-lg *:bg-gray-200",
        "disabled:bg-slate-50",
        "disabled:text-slate-500",
        "disabled:border-slate-200",
        "disabled:shadow-none",
        "invalid:bg-black",
      ],
      inline: ["inline-block"],
    },
    inputSize: {
      default: ["w-full content-center"],
      full: ["w-full"],
      small: [""],
    },
  },
  defaultVariants: { inputSize: "default", variant: "default" },
});

export function Select({
  //name,
  label,
  error,
  includeBlank,
  //children,
  options,
  //disabled,
  //defaultValue,
  //value,
  inputSize = "full",
  //onChange,
  //onBlur,
  variant,
  className,
  ...props
}: //size,
//ref,
SelectProps) {
  const opts = options
    ? Object.entries(options).map(([k, v]) => (
        <option key={k} value={k}>
          {v}
        </option>
      ))
    : props.children;
  return (
    <Label
      className={className}
      error={error}
      inputSize={inputSize}
      //variant="inline"
      label={label === undefined ? props.name : label!}
    >
      <div className={clsx("flex w-full")}>
        <select {...props} className={selectStyles({ inputSize, variant })}>
          {includeBlank && <option value=""></option>}
          {opts}
        </select>
      </div>
    </Label>
  );
}
