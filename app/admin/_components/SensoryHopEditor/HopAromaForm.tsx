import { RangeSelect } from "@/components/Form/RangeSelect";
import clsx from "clsx";
import { FieldValues, Path, UseFormRegisterReturn } from "react-hook-form";
import AromaSelect from "./AromaSelect";

export function HopAromaForm<T extends FieldValues>({
  label,
  disabled,
  name,
  className,
  aromas,
  rangeProps,
  aromaProps,
  //...props,
}: {
  aromas: any;
  name: Path<T>;
  disabled?: boolean;
  className?: string;
  label?: React.ReactNode;
  rangeProps: UseFormRegisterReturn;
  aromaProps: UseFormRegisterReturn;
}) {
  return (
    <div
      className={clsx(
        " lg:grid flex flex-col lg:grid-cols-7 odd:bg-blue-50 ",
        className,
      )}
    >
      <div className="text-center lg:text-right px-1 text-lg lg:text-2xl underline">
        <span className=" shrink">{label ?? name}</span>
      </div>
      <RangeSelect
        disabled={disabled}
        className="lg:col-span-2"
        {...rangeProps}
      />
      <AromaSelect
        disabled={disabled}
        className="shrink lg:col-span-4 "
        {...aromaProps}
        aromas={aromas}
      />
    </div>
  );
}

export default HopAromaForm;
