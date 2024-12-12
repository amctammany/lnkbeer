"use client";
import { AppBarItem } from "@/components/AppBarItem";
import { AppBarLayout } from "@/components/AppBarLayout";
import { Ca2, HCO3, MgSo4, Na, SO4 } from "@/components/Elements";
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
import { useActionForm } from "@/hooks/useActionForm";
import { EquipmentProfile } from "@prisma/client";
import { Save } from "lucide-react";
import EquipmentProfileFormActions from "./EquipmentProfileFormActions";

export type EquipmentProfileFormProps = {
  src?: EquipmentProfile | null;
  action: any;
};

export function EquipmentProfileForm({
  src,
  action,
}: EquipmentProfileFormProps) {
  const { state, register, control, getValues, formAction } =
    useActionForm<EquipmentProfile>(action, src!);
  return (
    <Form className="flex" action={formAction}>
      <AppBarLayout
        title={`EquipmentProfile Editor: ${src?.name}`}
        actions={<EquipmentProfileFormActions />}
      >
        <div className="gap-2 lg:w-9/12 mx-auto">
          <div className="m-2 border-2 flex flex-col rounded-sm ">
            <span className="flex-shrink p-2 block bg-slate-300">General</span>
            <div className="flex-grow">
              <Input type="hidden" {...register("id")} />
              <TextField {...register("name")} />
              <TextField {...register("description")} />
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                <NumberField
                  step={0.01}
                  {...register("boilTime")}
                  error={state.errors?.boilTime}
                  suffix="gal"
                />
                <NumberField
                  step={0.01}
                  {...register("batchVolume")}
                  error={state.errors?.batchVolume}
                  suffix="gal"
                />
                <NumberField
                  step={0.01}
                  {...register("preboilVolume")}
                  error={state.errors?.preboilVolume}
                  suffix="gal"
                />
                <NumberField
                  step={0.01}
                  {...register("boilOffRate")}
                  suffix="gal/hr"
                />
                <NumberField
                  step={0.01}
                  {...register("mashEfficiency")}
                  suffix="%"
                />
                <NumberField
                  step={0.01}
                  {...register("brewEfficiency")}
                  suffix="%"
                />
                <NumberField
                  step={0.01}
                  {...register("fermenterLoss")}
                  suffix="gal"
                />
                <NumberField
                  step={0.01}
                  {...register("trubLoss")}
                  suffix="gal"
                />
                <NumberField
                  step={0.01}
                  {...register("mashLoss")}
                  suffix="gal"
                />
                <NumberField
                  step={0.01}
                  {...register("grainAbsorption")}
                  suffix="gal"
                />
                <NumberField
                  step={0.01}
                  {...register("waterGrainRatio")}
                  suffix="gal"
                />
              </div>
            </div>
          </div>
        </div>
      </AppBarLayout>
    </Form>
  );
}

export default EquipmentProfileForm;
