"use client";
import { Form } from "@/components/Form/Form";
import { TextArea } from "@/components/Form/TextArea";
import { Button } from "@/components/ui/button";
import { useActionForm } from "@/hooks/useActionForm";
import { HopNote } from "@prisma/client";
type HopNoteInput = Partial<HopNote> & {
  id?: any;
};
export type NotesTabFormProps = {
  src?: HopNote;
  //user?: any;
  action?: any;
};
export function NotesTabForm({ action, src }: NotesTabFormProps) {
  console.log(src);
  const { state, register, control, getValues, formAction } =
    useActionForm<HopNoteInput>(action, src!);

  console.log(formAction);
  return (
    <Form action={formAction}>
      <input type="hidden" {...register("userEmail")} />
      <input type="hidden" {...register("hopId")} />
      <TextArea {...register("comments")} />
      <input type="submit" />
    </Form>
  );
}

export default NotesTabForm;
