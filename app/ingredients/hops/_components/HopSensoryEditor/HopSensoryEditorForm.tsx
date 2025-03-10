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
export type HopNoteInput = Partial<HopNote> & {
  id?: any;
  slug?: any;
  aromaIds?: string[];
  sensoryPanel?: any; // Partial<HopSensoryPanel>;
  //flavor?: number;
};
export type HopSensoryEditorFormProps = {
  src?:
    | (HopNote & {
        aromaIds: string[];
        hop: HopType;
        sensoryPanel: HopSensoryPanel & {
          aromas?: CharacteristicAroma[];
          aromaIds?: string[];
        };
      })
    | null;
  //user?: any;
  register: UseFormReturn<HopNoteInput>["register"];
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
    <div className={clsx("grid items-center  my-0 gap-3", className)}>
      <div className="flex items-center gap-4">
        {aromas.map((aroma) => (
          <div
            key={aroma.id}
            className="flex border b-1 rounded-lg justify-around items-center space-y-2 space-x-2 "
          >
            <label
              className="border b-1 m-auto px-1 gap-0 has-checked:bg-red-100"
              htmlFor={`aroma-${aroma.id}`}
            >
              <input
                className="peer size-3"
                {...props}
                type="checkbox"
                key={`aroma-${aroma.id}`}
                id={`aroma-${aroma.id}`}
                //name={props.name}
                //onChange={handleChange}
                value={aroma.id.toString()}
                //checked={props.ref.current.toString() === i.toString()}
              />
              <span className="px-2 text-sm peer-checked:text-blue peer-checked:underline">
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
    <div className={clsx("flex", className)}>
      <div className="m-auto px-2">
        <span className=" shrink">{label ?? name}</span>
      </div>
      <RangeSelect className="grow" {...rangeProps} />
      <AromaSelect className="grow" {...aromaProps} aromas={aromas} />
    </div>
  );
}
const RangeSelect = ({
  label,
  className,
  ...props
}: UseFormRegisterReturn & { className?: string; label?: React.ReactNode }) => {
  return (
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
  );
};
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
        <input type="hidden" {...register("slug", { value: src?.hop.slug })} />
        <input
          type="hidden"
          {...register("sensoryPanel.id", { value: src?.sensoryPanelId })}
        />
        <div>
          <TextArea {...register("comments")} />
        </div>
        <div>
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
              rangeProps={register(`sensoryPanel.${lowerFirst(k)}`, {
                value: src?.sensoryPanel?.[lowerFirst(k)]?.toString(),
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
