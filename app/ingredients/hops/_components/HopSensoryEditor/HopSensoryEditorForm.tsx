"use client";
import { TextArea } from "@/components/Form/TextArea";
import { Button } from "@/components/ui/button";
import {
  AromaGroups,
  CharacteristicAroma,
  Hop as HopType,
  HopNote,
  HopSensoryPanel,
} from "@prisma/client";
import {
  FieldValues,
  Path,
  UseFormRegisterReturn,
  UseFormReturn,
} from "react-hook-form";
import clsx from "clsx";
import { lowerFirst } from "@/lib/utils";
import { RangeSelect } from "@/components/Form/RangeSelect";
import { HopNoteSchema } from "@/schemas/hopSchema";
export type HopNoteInput = Partial<HopNote> & {
  aromaIds?: string[];
  hop?: HopType;
  sensoryPanel?: HopSensoryPanel & {
    aromas?: CharacteristicAroma[];
    aromaIds?: string[];
  };
};
export type HopSensoryEditorFormProps = {
  src?: HopNoteInput | null;
  //user?: any;
  register: UseFormReturn<HopNoteSchema>["register"];
  aromas: CharacteristicAroma[];
  action?: any;
};
const AromaSelect = ({
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
      <div className="flex overflow-x-scroll scrollbar-h-0 scrollbar">
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
function HopAromaForm<T extends FieldValues>({
  label,
  name,
  className,
  aromas,
  rangeProps,
  aromaProps,
  //...props,
}: {
  aromas: any;
  name: Path<T>;
  className?: string;
  label?: React.ReactNode;
  rangeProps: UseFormRegisterReturn;
  aromaProps: UseFormRegisterReturn;
}) {
  return (
    <div
      className={clsx(
        " md:grid flex flex-col md:grid-cols-7 odd:bg-blue-50 ",
        className,
      )}
    >
      <div className="text-center md:text-right px-1">
        <span className=" shrink">{label ?? name}</span>
      </div>
      <RangeSelect className="md:col-span-2" {...rangeProps} />
      <AromaSelect
        className="shrink md:col-span-4 "
        {...aromaProps}
        aromas={aromas}
      />
    </div>
  );
}
export function HopSensoryEditorForm({
  action,
  register,
  aromas,
  src,
}: HopSensoryEditorFormProps) {
  const sensoryPanel = [
    "stoneFruit",
    "berry",
    "pomme",
    "melon",
    "tropical",
    "citrus",
    "sweetAromatic",
    "floral",
    "herbal",
    "vegetal",
    "grassy",
    "earthy",
    "woody",
    "spicy",
    "onionGarlic",
    "driedFruit",
    "dank",
  ].reduce((acc, prop) => {
    acc[prop] = ((src?.sensoryPanel?.[prop] ?? 0) * 10)?.toString();
    return acc;
  }, {});
  //const { state, register, control, getValues, formAction } =
  //useActionForm<HopNoteInput>(
  //action,
  //{
  //...src,
  //sensoryPanel,
  //}!,
  //);

  const aromaRegister = register("sensoryPanel.aromaIds", {
    value: (src?.sensoryPanel?.aromas ?? []).map(({ id }) => id),
  });
  return (
    <div className="grid auto-rows-auto w-full">
      <div className="grid auto-rows-auto w-full">
        <input type="hidden" {...register("userEmail")} />
        <input type="hidden" {...register("hopId")} />
        <input type="hidden" {...register("slug", { value: src?.hop?.slug })} />
        <input
          type="hidden"
          {...register("sensoryPanel.id", { value: src?.sensoryPanelId })}
        />
        <div>
          <TextArea {...register("sensoryPanel.notes")} />
        </div>
        <div className="grid grid-cols-1">
          {[
            "StoneFruit",
            "Pomme",
            "Berry",
            "Melon",
            "Tropical",
            "Citrus",
            "Floral",
            "Herbal",
            "Vegetal",
            "Grassy",
            "Woody",
            "Spicy",
            "OnionGarlic",
            "DriedFruit",
            "Dank",
          ].map((k) => (
            <HopAromaForm
              aromas={aromas.filter(({ group }) => group === k)}
              key={k}
              label={k}
              name={`sensoryPanel.${lowerFirst(k)}`}
              rangeProps={register(`sensoryPanel.${lowerFirst(k)}` as any, {
                value: (sensoryPanel?.[lowerFirst(k)] * 10).toString(),
              })}
              aromaProps={aromaRegister}
            />
          ))}
        </div>
        <div>
          <Button type="submit">Save</Button>
        </div>
      </div>
    </div>
  );
}

export default HopSensoryEditorForm;
