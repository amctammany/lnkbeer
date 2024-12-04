import { Label } from "./Label";
//import { VariantProps, cva } from "class-variance-authority";
//import { SchemaFieldError } from "@/lib/validateSchema";
import { Input, inputStyles, InputProps } from "./Input";
//import clsx from "clsx";

export type NumberFieldProps = {
  //name: string;
  //label?: string;
  //defaultValue?: any;
  //error?: SchemaFieldError;
  step?: number;
  //disabled?: oolean;
  //onChange?: (e: SyntheticEvent) => void;
  //onBlur?: (e: SyntheticEvent) => void;
  //value?: any;
  //ref: any;
} & InputProps;
//VariantProps<typeof numberFieldStyles>;

/**
const numberFieldStyles = cva("input ", {
  variants: {
    variant: {
      default: [
        "block",
        "disabled:bg-slate-50",
        "disabled:text-slate-500",
        "disabled:border-slate-200",
        "disabled:shadow-none",
      ],
      error: ["bg-error-200"],
    },
    size: {
      default: ["w-auto"],
      small: ["w-auto"],
    },
  },
  defaultVariants: { size: "default", variant: "default" },
});
 */

export function NumberField({
  name,
  label,
  variant,
  size,
  className,
  suffix,
  inputSize = "full",
  error,
  ...props
}: NumberFieldProps) {
  return (
    <Label
      //className={clsx(numberFieldStyles({ variant, size }))}
      suffix={suffix}
      variant={variant}
      inputSize={inputSize}
      className={className}
      label={label !== null ? label || name : ""}
      error={error}
    >
      <Input
        type="number"
        name={name}
        error={error}
        variant={variant}
        inputSize={inputSize}
        {...props}
      />
    </Label>
  );
}

export function NumberFieldRaw({
  //className,
  //size,
  //variant,
  //error,
  ...props
}: NumberFieldProps) {
  return (
    <input type="number" onWheel={(e) => e.currentTarget.blur()} {...props} />
  );
}
