import { Label } from "./Label";
//import { cva } from "class-variance-authority";
import { Input, InputProps, inputStyles } from "./Input";
import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";

export type TextFieldProps = InputProps & VariantProps<typeof textFieldStyles>;
const textFieldStyles = cva(
  "disabled:bg-slate-50 disabled:shadow-none disabled:text-slate-500 disabled:border-slate-200",
  {
    variants: {
      variant: {
        error: ["border-2 border-red-500"],
        default: ["block"],
      },
      size: {
        default: ["w-full"],
        small: [""],
      },
    },
    defaultVariants: { size: "default", variant: "default" },
  },
);
export function TextField({
  name,
  error,
  className,
  label,
  suffix,
  variant,
  size,
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
        className={clsx(inputStyles({ variant }), textFieldStyles({ variant }))}
        name={name}
        error={error}
        variant={variant}
        inputSize={inputSize}
        {...props}
      />
    </Label>
  );
}
