import { ComponentProps, SyntheticEvent } from "react";
import { Label } from "./Label";
import { VariantProps, cva } from "class-variance-authority";
import { SchemaFieldError } from "@/lib/validateSchema";

export type TextAreaProps = {
  name: string;
  label?: string;
  rows?: number;
  error?: SchemaFieldError;
  disabled?: boolean;
  defaultValue?: any;
  onChange?: (e: SyntheticEvent) => void;
  onBlur?: (e: SyntheticEvent) => void;
  value?: any;
} & VariantProps<typeof textAreaStyles> &
  ComponentProps<"textarea">;
const textAreaStyles = cva(["block"], {
  variants: {
    variant: {
      error: ["bg-warning-50"],
      default: [
        "disabled:bg-slate-50",
        "disabled:text-slate-500",
        "disabled:border-slate-200",
        "disabled:shadow-none",
      ],
    },
    size: {
      default: ["w-full"],
    },
  },
  defaultVariants: { size: "default", variant: "default" },
});

export function TextArea({
  name,
  label,
  rows,
  error,
  className,
  variant,
  size,
  //ref,
  ...props
}: TextAreaProps) {
  return (
    <Label className={className} error={error} label={label || name}>
      <textarea
        //ref={ref}
        className={textAreaStyles({
          variant: error ? "error" : variant,
          size,
        })}
        name={name}
        rows={rows || 3}
        {...props}
      />
    </Label>
  );
}
