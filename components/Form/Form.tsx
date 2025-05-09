import { VariantProps, cva } from "class-variance-authority";
import { ComponentProps } from "react";
import {
  type FieldValues,
  //Form as HookForm,
  //SubmitHandler,
  //UseFormHandleSubmit,
} from "react-hook-form";

//eslint-disable-next-line
export type FormProps<T extends FieldValues = FieldValues> = {
  children?: React.ReactNode;
  action?: (data: FormData) => void;
  onSubmit?: any;
} & VariantProps<typeof formStyles> &
  ComponentProps<"form">;
const formStyles = cva(["flex"], {
  variants: {
    variant: {
      default: ["bg-white"],
    },
    size: {
      default: ["w-full", "m-0", "p-0"],
    },
  },
  defaultVariants: { size: "default", variant: "default" },
});

export const Form = ({
  children,
  action,
  //onSubmit,
  variant,
  size,
  ...props
}: FormProps) => {
  return (
    <form action={action} {...props}>
      <div className={formStyles({ size, variant })}>{children}</div>
    </form>
  );
};
