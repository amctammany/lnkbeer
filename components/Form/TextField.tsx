import { Label } from "./Label";
//import { cva } from "class-variance-authority";
import { Input, InputProps } from "./Input";
import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";

export type TextFieldProps = InputProps & VariantProps<typeof textFieldStyles>;
const textFieldStyles = cva(
  "disabled:bg-slate-50 disabled:shadow-none disabled:text-slate-500 disabled:border-slate-200 bg-white",
  {
    variants: {
      variant: {
        error: ["border-2 border-red-500 "],
        default: ["block border-2 "],
      },
      size: {
        default: ["w-full"],
        small: [""],
      },
      suffix: {
        default: [],
        active: ["border-r-0"],
      },
    },
    defaultVariants: { size: "default", variant: "default", suffix: "default" },
  }
);
export function TextField({
  name,
  error,
  className,
  label,
  suffix,
  variant,
  //size,
  inputSize = "full",
  ...props
}: TextFieldProps) {
  return (
    <Label
      variant={variant}
      suffix={suffix}
      inputSize={inputSize}
      error={error}
      className={className}
      label={label || name}
    >
      <Input
        type="text"
        className={clsx(
          //inputStyles({ variant, suffix: !!suffix ? "active" : "default" }),
          textFieldStyles({ variant, suffix: suffix ? "active" : "default" })
        )}
        name={name}
        error={error}
        variant={variant}
        inputSize={inputSize}
        {...props}
      />
    </Label>
  );
}
