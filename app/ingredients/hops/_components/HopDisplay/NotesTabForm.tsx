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
type HopNoteInput = Partial<HopNote> & {
  id?: any;
  slug?: any;
  sensoryPanel?: Partial<HopSensoryPanel>;
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
}: UseFormRegisterReturn & { value: any }) => {
  //console.log(props);
  return (
    <Label className="items-center " label={<b>{props.name}</b>}>
      {Array.from({ length: 11 }).map((_, i) => (
        <div key={i} className="flex max-w-8 items-center space-y-0 space-x-2 ">
          <label htmlFor={`opt-${i}`}>
            <b>{i}</b>
          </label>
          <input
            {...props}
            type="radio"
            id={`opt-${i}`}
            value={i.toString()}
            checked={value.toString() === i.toString()}
          />
        </div>
      ))}
    </Label>
  );
};
export function NotesTabForm({ action, src }: NotesTabFormProps) {
  const { state, register, control, getValues, formAction } =
    useActionForm<HopNoteInput>(action, src!);

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
        <RangeSelecter
          control={control}
          //{...register("sensoryPanel.stoneFruit")}
          //value={getValues("sensoryPanel.stoneFruit")}
        />
        <RangeSelect
          {...register("sensoryPanel.pomme")}
          value={src?.sensoryPanel.pomme.toString()}
        />
        <Slider {...register("sensoryPanel.onionGarlic")} min={0} max={10} />
        <Slider {...register("sensoryPanel.sweetAromatic")} min={0} max={10} />
        <input type="submit" />
      </div>
    </Form>
  );
}

export default NotesTabForm;
