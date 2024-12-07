"use client";
import { AppBarLayout } from "@/components/AppBarLayout";
import { Form } from "@/components/Form/Form";
import { Input } from "@/components/Form/Input";
import { NumberField } from "@/components/Form/NumberField";
import { RangeField, RangeFieldProp } from "@/components/Form/RangeField";
import { Select } from "@/components/Form/Select";
//import { NumberField } from "@/components/Form/NumberField";
//import { RangeField } from "@/components/Form/RangeField";
//import { RangeValue } from "@/components/Form/RangeSlider";
//import { Select } from "@/components/Form/Select";
import { TextField } from "@/components/Form/TextField";
import Section from "@/components/Section";
import { useActionForm } from "@/hooks/useActionForm";
import { ExtendedMashProfile, MashProfileInput } from "@/types/Profile";
import { MashProfile, MashStep, MashStepType } from "@prisma/client";
import { Plus, Save } from "lucide-react";
import { MashStepListItem } from "./MashStepListItem";

export type MashProfileFormProps = {
  src?: MashStep | null;
  action: any;
};
export type MashProfileFormContainerProps = {
  src?: MashStep | null;
  children?: React.ReactNode;
  action: any;
};
export function MashProfileFormContainer({
  children,
  src,
  action,
}: MashProfileFormContainerProps) {
  const { state, register, control, getValues, formAction } =
    useActionForm<MashStep>(action, src!);
  return <Form action={formAction}>{children}</Form>;
}
export function MashProfileForm({ src, action }: MashProfileFormProps) {
  const { state, register, control, getValues, formAction } =
    useActionForm<MashStep>(action, src!);
  return (
    <div className="block gap-2 w-full">
      <Input type="hidden" {...register("id")} />
      <TextField {...register("name")} />
      <Select {...register("type")} options={MashStepType} />

      <NumberField {...register("temperature")} step={0.1} />
      <NumberField {...register("time")} step={0.1} />
      <NumberField {...register("rampTime")} step={0.1} />
    </div>
  );
}

export default MashProfileForm;
