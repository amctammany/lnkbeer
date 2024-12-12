"use client";
import { AppBarLayout } from "@/components/AppBarLayout";
import { Ca2, HCO3, MgSo4, Na, SO4 } from "@/components/Elements";
import { Form } from "@/components/Form/Form";
import { Input } from "@/components/Form/Input";
import { NumberField } from "@/components/Form/NumberField";
//import { NumberField } from "@/components/Form/NumberField";
//import { RangeField } from "@/components/Form/RangeField";
//import { RangeValue } from "@/components/Form/RangeSlider";
//import { Select } from "@/components/Form/Select";
import { TextField } from "@/components/Form/TextField";
import { useActionForm } from "@/hooks/useActionForm";
import { WaterProfile } from "@prisma/client";
import WaterProfileFormActions from "./WaterProfileFormActions";

export type WaterProfileFormProps = {
  src?: WaterProfile | null;
  action: any;
};

export function WaterProfileForm({ src, action }: WaterProfileFormProps) {
  const { state, register, control, getValues, formAction } =
    useActionForm<WaterProfile>(action, src!);

  return (
    <Form className="flex" action={formAction}>
      <AppBarLayout
        title={`WaterProfile Editor: ${src?.name}`}
        actions={<WaterProfileFormActions src={src} />}
      >
        <div className="grid grid-cols-4 gap-2 w-9/12 mx-auto">
          <div className="m-2 border-2 flex flex-col rounded-sm col-span-4 ">
            <span className="flex-shrink p-2 block bg-slate-300">General</span>
            <div className="flex-grow">
              <Input type="hidden" {...register("id")} />
              <Input type="hidden" {...register("forkedFrom")} />
              <Input type="hidden" {...register("userId")} />
              <TextField {...register("name")} />
              <TextField {...register("description")} />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 ">
                <NumberField
                  {...register("calcium", { valueAsNumber: true })}
                  error={state.errors?.calcium as any}
                  label={<Ca2 />}
                  step={0.1}
                  suffix="ppm"
                />
                <NumberField
                  {...register("sodium", { valueAsNumber: true })}
                  error={state.errors?.sodium as any}
                  label={<Na />}
                  step={0.1}
                  suffix="ppm"
                />
                <NumberField
                  {...register("magnesium", { valueAsNumber: true })}
                  error={state.errors?.magnesium as any}
                  label={<MgSo4 />}
                  step={0.1}
                  suffix="ppm"
                />
                <NumberField
                  {...register("sulfate", { valueAsNumber: true })}
                  error={state.errors?.sulfate as any}
                  label={<SO4 />}
                  step={0.1}
                  suffix="ppm"
                />
                <NumberField
                  {...register("chloride", { valueAsNumber: true })}
                  error={state.errors?.chloride as any}
                  label={<Ca2 />}
                  step={0.1}
                  suffix="ppm"
                />
                <NumberField
                  {...register("bicarbonate", { valueAsNumber: true })}
                  error={state.errors?.bicarbonate as any}
                  label={<HCO3 />}
                  step={0.1}
                  suffix="ppm"
                />
              </div>
            </div>
          </div>
        </div>
      </AppBarLayout>
    </Form>
  );
}

export default WaterProfileForm;
