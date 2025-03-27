import clsx from "clsx";
//import { UseFormRegisterReturn } from "react-hook-form";
import { InputProps } from "./Input";
//import { Label } from "./Label";

export type RangeSelectProps = InputProps & {
  range?: number[];
};
export const RangeSelect = ({
  //label,
  //inputSize,
  className,
  //error,
  ...props
}: RangeSelectProps) => {
  return (
    <div className={clsx("grid grid-cols-12 justify-items-center", className)}>
      <span className=" m-auto">0</span>
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="grid justify-items-center m-auto space-y-2 space-x-2 au "
        >
          <label
            className="sef-stretch p-1 gap-0"
            htmlFor={`opt-${props.name}-${i}`}
          >
            <input
              className="size-4"
              {...props}
              type="radio"
              key={`opt-${props.name}-${i}`}
              id={`opt-${props.name}-${i}`}
              //name={props.name}
              //onChange={handleChange}
              value={i.toString()}
              //checked={props.ref.current.toString() === i.toString()}
            />
          </label>
        </div>
      ))}
      <span className="m-auto">10</span>
    </div>
  );
};
/**
 *(
    <div
      className={clsx(
        "flex justify-evenly items-stretch justify-items-stretch my-0",
        className,
      )}
    >
      <b className="m-auto ">0</b>
      {Array.from({ length: 11 }).map((_, i) => (
        <div
          key={i}
          className="grid border grid-flow-col-dense auto-cols-auto justify-self-auto b-1 m-auto items-center space-y-2 space-x-2 au "
        >
          <label
            className="self-stretch p-1 gap-0"
            htmlFor={`opt-${props.name}-${i}`}
          >
            <input
              className="size-2"
              {...props}
              type="radio"
              key={`opt-${props.name}-${i}`}
              id={`opt-${props.name}-${i}`}
              //name={props.name}
              //onChange={handleChange}
              value={i.toString()}
              //checked={props.ref.current.toString() === i.toString()}
            />
          </label>
        </div>
      ))}
      <b className="my-auto text-lg">10</b>
    </div>
  )
 */
