"use client";
import { Form } from "@/components/Form/Form";
import { TextArea } from "@/components/Form/TextArea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/Form/Label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useActionForm } from "@/hooks/useActionForm";
import {
  AromaGroups,
  CharacteristicAroma,
  Hop,
  HopNote,
  HopSensoryPanel,
} from "@prisma/client";
import { useController, UseFormRegisterReturn } from "react-hook-form";
import { TextField } from "@/components/Form/TextField";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
type HopNoteInput = Partial<HopNote> & {
  id?: any;
  slug?: any;
  aromaIds?: string[];
  sensoryPanel?: any; // Partial<HopSensoryPanel>;
  flavor?: number;
  stoneFruit?: number;
  pomme?: number;
};
export type NotesTabFormProps = {
  src?: HopNote & {
    aromaIds: string[];
    hop: Hop;
    sensoryPanel: HopSensoryPanel & {
      aromas?: CharacteristicAroma[];
      aromaIds?: string[];
    };
  };
  //user?: any;
  aromas: CharacteristicAroma[];
  action?: any;
};
const RangeSelecter = ({ control, name, ...props }: any) => {
  //console.log(props);
  const { field, fieldState } = useController({ name, control });
  return (
    <Label className="items-center " label={<b>{props.name}</b>}>
      {Array.from({ length: 11 }).map((_, i) => (
        <div key={i} className="flex max-w-8 items-center space-y-0 space-x-2 ">
          <label htmlFor={`opt-${i}`}>
            <b>{i}</b>
          </label>
          <input
            {...field}
            type="radio"
            id={`opt-${i}`}
            //checked={value.toString() === i.toString()}
          />
        </div>
      ))}
    </Label>
  );
};
const AromaSelect = ({
  label,
  group,
  aromas,
  ...props
}: UseFormRegisterReturn & {
  aromas: CharacteristicAroma[];
  group?: AromaGroups;
  label?: React.ReactNode;
}) => {
  //console.log(props);
  //const [v, setV] = useState(value);
  //const handleChange = (e) => {
  //console.log(e.target.name, e.target.value);
  //setV(e.target.value);
  //};

  return (
    <div className="grid items-center  my-3">
      <b className="flex-grow">{label ?? props.name}</b>
      <div className="flex items-center ">
        {aromas.map((aroma) => (
          <div
            key={aroma.id}
            className="flex border b-1 items-center space-y-2 space-x-2 "
          >
            <label
              className="border b-1 p-2 gap-0"
              htmlFor={`aroma-${aroma.id}`}
            >
              <input
                {...props}
                type="checkbox"
                key={`aroma-${aroma.id}`}
                id={`aroma-${aroma.id}`}
                //name={props.name}
                //onChange={handleChange}
                value={aroma.id.toString()}
                //checked={props.ref.current.toString() === i.toString()}
              />
              <span className="px-2">{aroma.name}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

const RangeSelect = ({
  label,
  ...props
}: UseFormRegisterReturn & { label?: React.ReactNode }) => {
  //console.log(props);
  //const [v, setV] = useState(value);
  //const handleChange = (e) => {
  //console.log(e.target.name, e.target.value);
  //setV(e.target.value);
  //};

  return (
    <div className="grid items-center  my-3">
      <b className="flex-grow">{label ?? props.name}</b>
      <div className="flex items-center ">
        <b className="my-auto text-lg">0</b>
        {Array.from({ length: 11 }).map((_, i) => (
          <div
            key={i}
            className="flex border b-1 items-center space-y-2 space-x-2 "
          >
            <label className="p-2 gap-0" htmlFor={`opt-${props.name}-${i}`}>
              <input
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
    </div>
  );
};
export function NotesTabForm({ action, aromas, src }: NotesTabFormProps) {
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
  const { state, register, control, getValues, formAction } =
    useActionForm<HopNoteInput>(
      action,
      {
        ...src,
        //stoneFruit: src?.sensoryPanel.stoneFruit.toString(),
        sensoryPanel,
      }!,
    );

  //console.log(src);
  return (
    <div className="grid auto-rows-auto w-full">
      <Form action={formAction}>
        <div className="grid auto-rows-auto w-full">
          <input type="hidden" {...register("userEmail")} />
          <input type="hidden" {...register("hopId")} />
          <input
            type="hidden"
            {...register("slug", { value: src?.hop.slug })}
          />
          <input
            type="hidden"
            {...register("sensoryPanel.id", { value: src?.sensoryPanelId })}
          />
          <div>
            <TextArea {...register("comments")} />
          </div>
          <div>
            <RangeSelect
              label="Stone Fruit"
              {...register("sensoryPanel.stoneFruit", {
                value: src?.sensoryPanel?.stoneFruit.toString(),
              })}
            />
            <AromaSelect
              group={"StoneFruit"}
              {...register("sensoryPanel.aromaIds", {
                value: (src?.sensoryPanel?.aromas ?? []).map(({ id }) => id),
              })}
              aromas={aromas.filter(({ group }) => group === "DriedFruit")}
            />

            <RangeSelect
              {...register("sensoryPanel.pomme", {
                value: src?.sensoryPanel?.pomme.toString(),
              })}
            />
            <RangeSelect
              {...register("sensoryPanel.berry", {
                value: src?.sensoryPanel?.berry.toString(),
              })}
            />
            <RangeSelect
              {...register("sensoryPanel.melon", {
                value: src?.sensoryPanel?.melon.toString(),
              })}
            />
            <RangeSelect
              {...register("sensoryPanel.tropical", {
                value: src?.sensoryPanel?.tropical.toString(),
              })}
            />
            <RangeSelect
              {...register("sensoryPanel.citrus", {
                value: src?.sensoryPanel?.citrus.toString(),
              })}
            />
            <RangeSelect
              {...register("sensoryPanel.floral", {
                value: src?.sensoryPanel?.floral.toString(),
              })}
            />
            <RangeSelect
              {...register("sensoryPanel.herbal", {
                value: src?.sensoryPanel?.herbal.toString(),
              })}
            />
            <RangeSelect
              {...register("sensoryPanel.vegetal", {
                value: src?.sensoryPanel?.vegetal.toString(),
              })}
            />
            <RangeSelect
              {...register("sensoryPanel.grassy", {
                value: src?.sensoryPanel?.grassy.toString(),
              })}
            />
            <RangeSelect
              {...register("sensoryPanel.woody", {
                value: src?.sensoryPanel?.woody.toString(),
              })}
            />

            <RangeSelect
              {...register("sensoryPanel.earthy", {
                value: src?.sensoryPanel?.earthy.toString(),
              })}
            />
            <RangeSelect
              {...register("sensoryPanel.spicy", {
                value: src?.sensoryPanel?.spicy.toString(),
              })}
            />
            <RangeSelect
              {...register("sensoryPanel.onionGarlic", {
                value: src?.sensoryPanel?.onionGarlic.toString(),
              })}
            />
            <RangeSelect
              {...register("sensoryPanel.driedFruit", {
                value: src?.sensoryPanel?.driedFruit.toString(),
              })}
            />
            <RangeSelect
              {...register("sensoryPanel.dank", {
                value: src?.sensoryPanel?.dank.toString(),
              })}
            />
          </div>
          <div>
            <Button type="submit">Save</Button>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default NotesTabForm;
