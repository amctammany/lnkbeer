"use client";
import { Form } from "@/components/Form/Form";
import { Input } from "@/components/Form/Input";
import { NumberField } from "@/components/Form/NumberField";
import { Select } from "@/components/Form/Select";
import { TextField } from "@/components/Form/TextField";
//import { useActionForm } from "@/hooks/useActionForm";
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
import { mashStepSchema, MashStepSchema } from "@/schemas/mashProfileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export type MashStepFormProps = {
  src?: MashStepInput | null;
  action?: any;
} & ComponentProps<"form">;
export function MashStepForm({ src, action, ...props }: MashStepFormProps) {
  const {
    register,
    handleSubmit,
    formState: state,
  } = useForm<MashStepSchema>({
    defaultValues: src!,
    resolver: zodResolver(mashStepSchema),
  });

  const { replace } = useRouter();
  //useContext(
  //MashProfileFormContext,
  //);
  //console.log(state);
  const handleOpen = (open: boolean) => {
    if (!open)
      replace(`/profiles/mash/${src?.MashProfile?.slug}/edit`, {
        scroll: false,
      });
  };
  return (
    <Dialog onOpenChange={handleOpen} defaultOpen={src !== undefined}>
      <DialogOverlay className="bg-black/30">
        <DialogContent className="sm:max-w-lg m-auto in-h-[400px]">
          <DialogHeader>
            <DialogTitle>Mash Step Editor</DialogTitle>
            <DialogDescription>Mash Step</DialogDescription>
          </DialogHeader>

          <Form onSubmit={handleSubmit(action)} {...props}>
            <div className="grid grid-cols-6 gap-2 w-full">
              <Input type="hidden" {...register("id")} />
              <Input type="hidden" {...register("mashProfileId")} />
              <Input type="hidden" {...register("rank")} />
              <TextField className="col-span-6" {...register("name")} />
              <Select
                className="col-span-6"
                {...register("type")}
                error={state.errors?.type}
                options={MashStepType}
              />

              <NumberField
                className="col-span-6 md:col-span-2"
                {...register("temperature")}
                step={0.1}
                suffix="&deg;F"
                error={state.errors?.temperature}
              />
              <NumberField
                {...register("time")}
                className="col-span-3 md:col-span-2"
                step={0.1}
                suffix="min"
                error={state.errors?.time}
              />
              <NumberField
                {...register("rampTime")}
                className="col-span-3 md:col-span-2"
                step={0.1}
                suffix="min"
                error={state.errors?.rampTime}
              />
              <Button className="col-span-6" type="submit">
                Save
              </Button>
            </div>
          </Form>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}

export default MashStepForm;
