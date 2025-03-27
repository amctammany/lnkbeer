import { ChangeEventHandler, useEffect, useState } from "react";
import { Label } from "./Label";
//import { cva } from "class-variance-authority";
//import { SchemaFieldError } from "@/lib/validateSchema";
import { InputProps } from "./Input";
//import { FieldValues, Path, UseControllerReturn } from "react-hook-form";
import clsx from "clsx";
import { NumberFieldRaw } from "./NumberField";
import { FieldValues } from "react-hook-form";
import { NumberKeys, RangeKeys } from "@/types/util";
import { SchemaFieldError } from "@/lib/validateSchema";
export type RangeFieldProp<T extends FieldValues> = {
  name: Required<RangeKeys<T>>;
  lowField: Required<NumberKeys<T>>;
  highField: Required<NumberKeys<T>>;
  min?: number;
  max?: number;
};

export type RangeFieldProps = //H extends Path<T> = Path<T>,
  {
    step?: number;
    min?: number;
    max?: number;
    lowField?: any; //UseControllerReturn<T, Path<T>>; //["field"];
    highField?: any; //UseControllerReturn<T, Path<T>>; //["field"];
    onChange: any;
    error?: any;
    errors?: (undefined | SchemaFieldError)[];
    value?: { min?: number; max?: number };
  } & Omit<InputProps, "value" | "error">;

const inputClass = clsx(
  "absolute w-full h-full z-[30] p-0 opacity-0 appearance-none pointer-events-none ",
  "[&::-ms-track]:bg-transparent [&::-ms-track]:border-transparent [&::-ms-track]:appearance-none [&::-ms-thumb]:appearance-none [&::-ms-thumb]:[pointer-events:all] [&::-ms-thumb]:w-[var(--thumb-size)] [&::-ms-thumb]:h-[var(--thumb-size)] [&::-ms-thumb]:bg-red-900 [&::-ms-thumb]:cursor-grab [[&::-ms-thumb]&:active]:[cursor:grabbing]",
  "[&::-moz-range-track]:bg-transparent [&::-moz-range-track]:border-transparent [&::-moz-range-track]:appearance-none [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:[pointer-events:all] [&::-moz-range-thumb]:w-[var(--thumb-size)] [&::-moz-range-thumb]:h-[var(--thumb-size)] [&::-moz-range-thumb]:bg-red-900 [&::-moz-range-thumb]:cursor-grab [[&::-moz-range-thumb]&:active]:[cursor:grabbing]",
  "[&::-webkit-slider-thumb]:rounded-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:[pointer-events:all] [&::-webkit-slider-thumb]:w-[var(--thumb-size)] [&::-webkit-slider-thumb]:h-[var(--thumb-size)] [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:bg-red-900 [border:0,none]  [&:focus::-webkit-slider-runnable-track]:border-transparent [&:focus::-webkit-slider-runnable-track]:appearance-none [&:focus::-webkit-slider-runnable-track]:w-[var(--thumb-size)] [&:focus::-webkit-slider-runnable-track]:h-[var(--thumb-size)] [&:focus::-webkit-slider-runnable-track]:bg-red-900   [[&::-webkit-slider-thumb]&:hover]:[cursor:grabbing] hover:bg-green-200 hover:text-blue-200 "
);
const controlClass = clsx(
  "w-[calc(var(--thumb-size)/1)] h-[var(--thumb-size)] rounded-[50%] absolute top-[40%] bg-pink-400 z-[2] -translate-y-[calc(50% + 8px)] transform[translate3d(0,-22%,0)] ml-[calc(var(--thumb-size)*-0.5)] pointer-events-none hover:bg-green-200 hover:text-blue-200 "
);

//const rangeFieldStyles = cva("input w-full", {
//variants: {
//variant: {
//default: [
//"block",
//"disabled:bg-slate-50",
//"disabled:text-slate-500",
//"disabled:border-slate-200",
//"disabled:shadow-none",
//],
//error: ["bg-error-200"],
//},
//size: {
//default: [""],
//small: [""],
//},
//},
//defaultVariants: { size: "default", variant: "default" },
//});

export function RangeField({
  name,
  label,
  step = 1,
  inputSize,
  //defaultValue,
  //disabled,
  //onBlur,
  onChange,
  value = {},
  //variant,

  //lowField,
  //highField,
  errors,
  error,
  className,
  max = 100,
  min = 0,

  ...props
}: RangeFieldProps) {
  const [minValue, setMinValue] = useState((value ? value.min : min) ?? 0);
  const [maxValue, setMaxValue] = useState((value ? value.max : max) ?? 100);
  useEffect(() => {
    if (value.min) setMinValue(value.min);
    if (value.max) setMaxValue(value.max);
  }, [value]);

  const handleMinChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    const newMinVal = Math.min(+e.target.value, maxValue - step);
    setMinValue(newMinVal);
    //console.log("min: " + newMinVal);
    //console.log(lowField.field.onChange);
    //lowField.field.onChange(newMinVal);
    onChange({ min: newMinVal, max: maxValue });
  };

  const handleMaxChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    const newMaxVal = Math.max(+e.target.value, minValue + step);
    //console.log("max: " + newMaxVal);
    //console.log(highField.field.onChange);
    setMaxValue(newMaxVal);
    //highField.field.onChange(newMaxVal);
    onChange({ min: minValue, max: newMaxVal });
  };

  const minPos = ((minValue - min) / (max - min)) * 100;
  const maxPos = ((maxValue - min) / (max - min)) * 100;
  return (
    <Label
      className={className}
      inputSize={inputSize}
      label={label ?? ""}
      error={error}
    >
      <div
        className="flex w-full"
        //style={{ "--thumb-size": THUMB_SIZE } as React.CSSProperties}
      >
        <NumberFieldRaw
          className="flex-shrink text-sm w-16 h-8"
          value={minValue}
          step={step}
          onChange={handleMinChange}
        />
        {errors?.[0]?.message}
        <div className="flex-grow">
          <div className="relative flex items-center mx-10 my-[calc(var(--thumb-size)/2)] pt-[1.6rem] h-[calc(var(--thumb-size)+1.0rem)]">
            <div className="absolute mx-0 h-[var(--thumb-size)] my-[calc(var(--thumb-size)*-.5)] w-[calc(100%+var(--thumb-size))]">
              <input
                disabled={props.disabled || false}
                className={inputClass}
                name={name}
                type="range"
                step={step || 1}
                onChange={handleMinChange}
                min={min}
                max={max}
                value={minValue}
                onWheel={(e) => e.currentTarget.blur()}
              />
              <input
                disabled={props.disabled || false}
                name={name}
                className={inputClass}
                min={min}
                max={max}
                type="range"
                step={step || 1}
                value={maxValue}
                onChange={handleMaxChange}
                onWheel={(e) => e.currentTarget.blur()}
              />
            </div>
            <div className="w-full bg-ble-300 absolute h-10">
              <div className={controlClass} style={{ left: `${minPos}%` }} />
              <div className="absolute w-full top-1/2 -translate-y-1/2 h-1 bg-gray-300">
                <div
                  className="absolute h-1 bg-pink-500 opacity-50"
                  style={{ left: `${minPos}%`, right: `${100 - maxPos}%` }}
                />
              </div>
              <div className={controlClass} style={{ left: `${maxPos}%` }} />
            </div>
          </div>
        </div>
        <NumberFieldRaw
          className="flex-shrink text-sm w-16 h-8"
          value={maxValue}
          step={step}
          onChange={handleMaxChange}
        />
        {errors?.[1]?.message}
      </div>
    </Label>
  );
}
