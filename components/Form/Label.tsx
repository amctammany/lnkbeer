import { type SchemaFieldError } from "@/lib/validateSchema";
import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import { ComponentProps } from "react";

export type LabelProps = {
  children?: React.ReactNode;
  error?: SchemaFieldError;
  label?: string | React.ReactNode;
  suffix?: string | React.ReactNode;
} & VariantProps<typeof labelStyles> &
  ComponentProps<"label">;
const labelStyles = cva(
  [
    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
    "w-full",
  ],
  {
    variants: {
      variant: {
        default: ["mx-0 mb-0 p-2 block"],
        error: ["p-2 block"],
        inline: ["grid auto-cols-auto grid-cols-2"],
      },
      inputSize: {
        default: ["px-2 py-1", ""],
        full: [],
        small: ["p-0"],
      },
    },
    defaultVariants: { inputSize: "default", variant: "default" },
  },
);
const labelChildStyles = cva(["w-full flex"], {
  variants: {
    variant: {
      default: ["text-gray-600"],
      error: ["text-destructive"],
      inline: ["text-gray-600"],
    },
    inputSize: {
      default: [""],
      full: [],
      small: [""],
    },
  },
  defaultVariants: { inputSize: "default", variant: "default" },
});

const labelSuffixStyles = cva(
  [
    "shrink grid items-center rounded-md rounded-l-none  align-middle justify-center bg-slate-400 text-sm font-medium leading-none ",
  ],
  {
    variants: {
      variant: {
        default: ["-gray-600"],
        error: ["text-destructive"],
        inline: ["text-gray-600"],
      },
      inputSize: {
        default: [""],
        full: [],
        small: [""],
      },
      suffixV: {
        hidden: ["hidden"],
        error: ["border-destructive border-2 rounded-l-none"],
        active: [""],
        default: [],
      },
    },
    defaultVariants: {
      inputSize: "default",
      variant: "default",
      suffixV: "default",
    },
  },
);

const labelLabelStyles = cva(["block capitalize my-auto mb-1"], {
  variants: {
    variant: {
      default: ["text-gray-600"],
      error: ["text-destructive"],
      inline: ["text-gray-600"],
    },
    inputSize: {
      default: ["h-6"],
      full: [],
      small: ["h-4"],
    },
  },
  defaultVariants: { inputSize: "default", variant: "default" },
});
const errorStyles = cva(["capitalize text-destructive text-xs mx-2"], {
  variants: {
    variant: {
      default: ["hidden"],
      error: ["block"],
      inline: [],
    },
    inputSize: {
      default: [""],
      full: ["w-full"],
      small: [""],
    },
  },
  defaultVariants: { inputSize: "default", variant: "default" },
});

export const Label = ({
  children,
  error,
  label,
  suffix,
  variant,
  inputSize,
  className,
}: LabelProps) => {
  return (
    <label
      className={clsx(
        labelStyles({ variant: error ? "error" : variant, inputSize }),
        className,
      )}
    >
      <span
        className={labelLabelStyles({
          variant: error ? "error" : variant,
          inputSize,
        })}
      >
        {label}
      </span>
      <div className={labelChildStyles({ variant: error ? "error" : variant })}>
        {children}

        <div
          className={labelSuffixStyles({
            variant: error ? "error" : variant,
            suffixV: suffix ? (error ? "error" : "active") : "hidden",
            //suffixV: error ? "error" : suffix ? "active" : "hidden",
          })}
        >
          <span className="my-auto block text-xs px-2 font-bold">{suffix}</span>
        </div>
      </div>
      <span
        className={errorStyles({
          variant: error ? "error" : variant,
          inputSize,
        })}
      >
        {error?.message}
      </span>
    </label>
  );
};
