"use client";
import { Form } from "@/components/Form/Form";
import { Input } from "@/components/Form/Input";
import { NumberField } from "@/components/Form/NumberField";
import { Select } from "@/components/Form/Select";
import { TextField } from "@/components/Form/TextField";
import { useActionForm } from "@/hooks/useActionForm";
import { MashStepInput } from "@/types/Profile";
import { MashStepType } from "@prisma/client";
import { ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { DialogHeader } from "@/components/ui/dialog";
import {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export type MashStepFormProps = {
  src?: MashStepInput | null;
  action?: any;
} & ComponentProps<"form">;
export function MashStepForm({ src, action, ...props }: MashStepFormProps) {
  const { state, register, control, getValues, formAction } =
    useActionForm<MashStepInput>(action, src!);
  const { replace } = useRouter();
  //useContext(
  //MashProfileFormContext,
  //);
  //console.log(state);
  const handleOpen = (open: boolean) => {
    if (!open) replace(`/profiles/mash/${src?.MashProfile.slug}/edit`);
  };
  return (
    <Dialog onOpenChange={handleOpen} defaultOpen={src !== undefined}>
      <DialogOverlay className="bg-black/30">
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mash Step Editor</DialogTitle>
            <DialogDescription>Mash Step</DialogDescription>
          </DialogHeader>

          <Form action={formAction} {...props}>
            <div className="block gap-2 w-full">
              <Input type="hidden" {...register("id")} />
              <TextField {...register("name")} />
              <Select {...register("type")} options={MashStepType} />

              <NumberField {...register("temperature")} step={0.1} />
              <NumberField {...register("time")} step={0.1} />
              <NumberField {...register("rampTime")} step={0.1} />
              <Button type="submit">Save</Button>
            </div>
          </Form>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}

export default MashStepForm;
