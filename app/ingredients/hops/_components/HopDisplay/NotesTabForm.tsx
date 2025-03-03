"use client";
import { Form } from "@/components/Form/Form";
import { TextArea } from "@/components/Form/TextArea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/Form/Label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useActionForm } from "@/hooks/useActionForm";
import { HopNote } from "@prisma/client";
import { UseFormRegisterReturn } from "react-hook-form";
type HopNoteInput = Partial<HopNote> & {
  id?: any;
  flavor?: number;
};
export type NotesTabFormProps = {
  src?: HopNote;
  //user?: any;
  action?: any;
};
const RangeSelect = (props: UseFormRegisterReturn) => {
  console.log(props);
  return (
    <RadioGroup defaultValue="option-one" className="flex">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="flex items-center space-y-0 space-x-2 ">
          <label htmlFor={`opt-${i}`}>
            <b>{i}</b>
          </label>
          <input id={`opt-${i}`} {...props} type="radio" value={i} />
        </div>
      ))}
    </RadioGroup>
  );
};
export function NotesTabForm({ action, src }: NotesTabFormProps) {
  const { state, register, control, getValues, formAction } =
    useActionForm<HopNoteInput>(action, src!);

  return (
    <Form action={formAction}>
      <div className="grid w-full">
        <input type="hidden" {...register("userEmail")} />
        <input type="hidden" {...register("hopId")} />
        <div>
          <TextArea {...register("comments")} />
        </div>
        <div>
          <RangeSelect {...register("flavor")} />
        </div>

        <input type="submit" />
      </div>
    </Form>
  );
}

export default NotesTabForm;
