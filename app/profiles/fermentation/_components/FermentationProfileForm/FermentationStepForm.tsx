"use client";
import { Form } from "@/components/Form/Form";
import { Input } from "@/components/Form/Input";
import { NumberField } from "@/components/Form/NumberField";
import { Select } from "@/components/Form/Select";
import { TextField } from "@/components/Form/TextField";
//import { useActionForm } from "@/hooks/useActionForm";
import { FermentationStepInput } from "@/types/Profile";
import { FermentationStepType } from "@prisma/client";
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
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FermentationStepSchema,
  fermentationStepSchema,
} from "@/schemas/fermentationProfileSchema";
import { useForm } from "react-hook-form";

export type FermentationStepFormProps = {
  src?: FermentationStepInput | null;
  action?: any;
} & ComponentProps<"form">;
export function FermentationStepForm({
  src,
  action,
  ...props
}: FermentationStepFormProps) {
  //const { state, register, control, getValues, formAction } =
  //useActionForm<FermentationStepInput>(action, src!);
  const {
    register,
    handleSubmit,
    formState: state,
  } = useForm<FermentationStepSchema>({
    defaultValues: src!,
    resolver: zodResolver(fermentationStepSchema),
  });

  const { replace } = useRouter();
  //useContext(
  //FermentationProfileFormContext,
  //);
  //console.log(state);
  const handleOpen = (open: boolean) => {
    if (!open)
      replace(`/profiles/fermentation/${src?.FermentationProfile.slug}/edit`, {
        scroll: false,
      });
  };
  return (
    <Dialog onOpenChange={handleOpen} defaultOpen={src !== undefined}>
      <DialogOverlay className="bg-black/30">
        <DialogContent className="max-w-[780px]  min--[400px]">
          <DialogHeader>
            <DialogTitle>Fermentation Step Editor</DialogTitle>
            <DialogDescription>Fermentation Step</DialogDescription>
          </DialogHeader>

          <Form onSubmit={handleSubmit(action)} {...props}>
            <div className="grid grid-cols-6 gap-2 w-full">
              <Input type="hidden" {...register("id")} />
              <Input type="hidden" {...register("fermentationProfileId")} />
              <Input type="hidden" {...register("rank")} />
              <TextField className="col-span-6" {...register("name")} />
              <Select
                className="col-span-6"
                {...register("type")}
                error={state.errors?.type}
                options={FermentationStepType}
              />

              <NumberField
                className="col-span-6 md:col-span-2"
                {...register("temperature")}
                suffix="&deg;F"
                step={0.1}
                error={state.errors?.temperature}
              />
              <NumberField
                className="col-span-3 md:col-span-2"
                suffix="min"
                {...register("time")}
                step={0.1}
                error={state.errors?.time}
              />
              <NumberField
                className="col-span-3 md:col-span-2"
                {...register("rampTime")}
                suffix="min"
                step={0.1}
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

export default FermentationStepForm;
