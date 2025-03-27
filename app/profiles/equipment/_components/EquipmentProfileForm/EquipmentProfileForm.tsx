"use client";
import { AppBarLayout } from "@/components/AppBarLayout";
import { Form } from "@/components/Form/Form";
import { Input } from "@/components/Form/Input";
import { NumberField } from "@/components/Form/NumberField";
import { Select } from "@/components/Form/Select";
import { TextField } from "@/components/Form/TextField";
//import { useActionForm } from "@/hooks/useActionForm";
import { SpargeMethodType } from "@prisma/client";
import { Anvil } from "lucide-react";
import EquipmentProfileFormActions from "./EquipmentProfileFormActions";
import AppBarTitle from "@/components/AppBarTitle";
import { EquipmentProfileInput } from "@/types/Profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  equipmentProfileSchema,
  EquipmentProfileSchema,
} from "@/schemas/equipmentProfileSchema";

export type EquipmentProfileFormProps = {
  src?: EquipmentProfileInput | null;
  action: any;
};

export function EquipmentProfileForm({
  src,
  action,
}: EquipmentProfileFormProps) {
  //const { state, register, formAction } = useActionForm<EquipmentProfileInput>(
  //action,
  //src!,
  //);
  //console.log(src, state);
  const {
    register,
    handleSubmit,
    formState: state,
  } = useForm<EquipmentProfileSchema>({
    defaultValues: src!,
    resolver: zodResolver(equipmentProfileSchema),
  });

  return (
    <Form className="flex " onSubmit={handleSubmit(action)}>
      <AppBarLayout
        title={<AppBarTitle icon={<Anvil />}>{src?.name}</AppBarTitle>}
        actions={<EquipmentProfileFormActions />}
      >
        <div className="p-1 lg:p-2 gap-0 l:gap-2 lg:w-9/12 mx-auto">
          <div className="m-0 lg:m-2 border-2 flex flex-col rounded-sm ">
            <span className="shrink p-2 block bg-slate-300">General</span>
            <div className="grow">
              <Input type="hidden" {...register("id")} />
              <Input type="hidden" {...register("userId")} />
              <TextField {...register("name")} error={state.errors?.name} />
              <TextField
                {...register("description")}
                error={state.errors?.description}
              />
              <Select
                {...register("spargeMethod")}
                error={state.errors?.spargeMethod}
                options={SpargeMethodType}
              />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
                  error={state.errors?.boilOffRate}
                  suffix="gal/hr"
                />
                <NumberField
                  step={0.01}
                  {...register("mashEfficiency")}
                  error={state.errors?.mashEfficiency}
                  suffix="%"
                />
                <NumberField
                  step={0.01}
                  {...register("brewEfficiency")}
                  error={state.errors?.brewEfficiency}
                  suffix="%"
                />
                <NumberField
                  step={0.01}
                  {...register("fermenterLoss")}
                  error={state.errors?.fermenterLoss}
                  suffix="gal"
                />
                <NumberField
                  step={0.01}
                  {...register("trubLoss")}
                  error={state.errors?.trubLoss}
                  suffix="gal"
                />
                <NumberField
                  step={0.01}
                  {...register("mashLoss")}
                  error={state.errors?.mashLoss}
                  suffix="gal"
                />
                <NumberField
                  step={0.01}
                  {...register("grainAbsorption")}
                  error={state.errors?.grainAbsorption}
                  suffix="gal"
                />
                <NumberField
                  step={0.01}
                  {...register("waterGrainRatio")}
                  error={state.errors?.waterGrainRatio}
                  suffix="gal"
                />
                <NumberField
                  step={0.01}
                  {...register("fermenterterTopOff")}
                  error={state.errors?.fermenterterTopOff}
                  suffix="gal"
                />
                <NumberField
                  step={0.01}
                  {...register("kettleTopOff")}
                  error={state.errors?.kettleTopOff}
                  suffix="gal"
                />
                <NumberField
                  step={0.01}
                  {...register("mashTunVolume")}
                  error={state.errors?.mashTunVolume}
                  suffix="gal"
                />
                <NumberField
                  step={0.01}
                  {...register("mashTunWeight")}
                  error={state.errors?.mashTunWeight}
                  suffix="lbs"
                />
                <NumberField
                  step={0.01}
                  {...register("mashTunHeatCapacity")}
                  error={state.errors?.mashTunHeatCapacity}
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
