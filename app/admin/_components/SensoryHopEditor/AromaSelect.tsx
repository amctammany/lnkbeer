import { AromaGroups, CharacteristicAroma } from "@prisma/client";
import clsx from "clsx";
import { UseFormRegisterReturn } from "react-hook-form";

export const AromaSelect = ({
  className,
  label,
  group,
  aromas,
  ...props
}: UseFormRegisterReturn & {
  className?: string;
  aromas: CharacteristicAroma[];
  group?: AromaGroups;
  label?: React.ReactNode;
}) => {
  return (
    <div className={clsx("w-full", className)}>
      <div className="flex overflow-x-scroll scrollbar-h-0 scrollbar gap-x-2">
        {aromas.map((aroma) => (
          <div
            key={aroma.id}
            className="w-fit h-6 flex border b-1 rounded-lg  "
          >
            <label
              className="inline-flex border b-1 m-auto px-1 gap-0 has-checked:bg-red-100"
              htmlFor={`aroma-${aroma.id}`}
            >
              <input
                className="peer m-auto size-3"
                {...props}
                type="checkbox"
                key={`aroma-${aroma.id}`}
                id={`aroma-${aroma.id}`}
                //name={props.name}
                //onChange={handleChange}
                value={aroma.id.toString()}
                //checked={props.ref.current.toString() === i.toString()}
              />
              <span className="px-2 whitespace-nowrap block text-sm peer-checked:text-blue peer-checked:underline">
                {aroma.name}
              </span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AromaSelect;
