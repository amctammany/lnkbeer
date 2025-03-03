"use client";
import { Form } from "@/components/Form/Form";
import { TextArea } from "@/components/Form/TextArea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/Form/Label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useActionForm } from "@/hooks/useActionForm";
import { Hop, HopNote, HopSensoryPanel } from "@prisma/client";
import { useController, UseFormRegisterReturn } from "react-hook-form";
import { TextField } from "@/components/Form/TextField";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
type HopNoteInput = Partial<HopNote> & {
  id?: any;
  slug?: any;
  sensoryPanel?: any; // Partial<HopSensoryPanel>;
  flavor?: number;
  stoneFruit?: number;
  pomme?: number;
};
export type NotesTabFormProps = {
  src?: HopNote & { hop: Hop; sensoryPanel: HopSensoryPanel };
  //user?: any;
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

const RangeSelect = ({
  value,
  ...props
}: UseFormRegisterReturn & { value?: any }) => {
  //console.log(props);
  //const [v, setV] = useState(value);
  //const handleChange = (e) => {
  //console.log(e.target.name, e.target.value);
  //setV(e.target.value);
  //};

  return (
    <Label className="items-center " label={<b>{props.name}</b>}>
      {Array.from({ length: 11 }).map((_, i) => (
        <div
          key={i}
          className="flex max-w-8 mx-2 items-center space-y-0 space-x-2 "
        >
          <label htmlFor={`opt-${props.name}-${i}`}>
            <b>{i}</b>
          </label>
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
        </div>
      ))}
    </Label>
  );
};
export function NotesTabForm({ action, src }: NotesTabFormProps) {
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
    acc[prop] = src?.sensoryPanel[prop]?.toString() ?? "0";
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
    <Form action={formAction}>
      <div className="grid w-full">
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

        <RangeSelect
          {...register("sensoryPanel.stoneFruit", {
            value: src?.sensoryPanel.stoneFruit.toString(),
          })}
        />

        <RangeSelect
          {...register("sensoryPanel.pomme", {
            value: src?.sensoryPanel.pomme.toString(),
          })}
        />
        <RangeSelect
          {...register("sensoryPanel.berry", {
            value: src?.sensoryPanel.berry.toString(),
          })}
        />
        <RangeSelect
          {...register("sensoryPanel.melon", {
            value: src?.sensoryPanel.melon.toString(),
          })}
        />
        <RangeSelect
          {...register("sensoryPanel.tropical", {
            value: src?.sensoryPanel.tropical.toString(),
          })}
        />
        <RangeSelect
          {...register("sensoryPanel.citrus", {
            value: src?.sensoryPanel.citrus.toString(),
          })}
        />
        <RangeSelect
          {...register("sensoryPanel.floral", {
            value: src?.sensoryPanel.floral.toString(),
          })}
        />
        <RangeSelect
          {...register("sensoryPanel.herbal", {
            value: src?.sensoryPanel.herbal.toString(),
          })}
        />
        <RangeSelect
          {...register("sensoryPanel.vegetal", {
            value: src?.sensoryPanel.vegetal.toString(),
          })}
        />
        <RangeSelect
          {...register("sensoryPanel.grassy", {
            value: src?.sensoryPanel.grassy.toString(),
          })}
        />
        <RangeSelect
          {...register("sensoryPanel.woody", {
            value: src?.sensoryPanel.woody.toString(),
          })}
        />

        <RangeSelect
          {...register("sensoryPanel.earthy", {
            value: src?.sensoryPanel.earthy.toString(),
          })}
        />
        <RangeSelect
          {...register("sensoryPanel.spicy", {
            value: src?.sensoryPanel.spicy.toString(),
          })}
        />
        <RangeSelect
          {...register("sensoryPanel.onionGarlic", {
            value: src?.sensoryPanel.onionGarlic.toString(),
          })}
        />
        <RangeSelect
          {...register("sensoryPanel.driedFruit", {
            value: src?.sensoryPanel.driedFruit.toString(),
          })}
        />
        <RangeSelect
          {...register("sensoryPanel.dank", {
            value: src?.sensoryPanel.dank.toString(),
          })}
        />
      </div>
      <input type="submit" />
    </Form>
  );
}

export default NotesTabForm;
