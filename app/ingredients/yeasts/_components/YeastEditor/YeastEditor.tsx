"use client";
import { AppBarItem } from "@/components/AppBarItem";
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
import { useActionForm } from "@/hooks/useActionForm";
import { RangeValue, YeastInput } from "@/types/ingredient";
import { YeastFlocculation, YeastForm, YeastType } from "@prisma/client";
import { Save } from "lucide-react";
import { Controller } from "react-hook-form";

export type YeastEditorProps = {
  src?: YeastInput | null;
  action: any;
};
const rangeProps: RangeFieldProp<YeastInput>[] = [
  {
    name: "tempRange",
    min: 0,
    max: 120,
    lowField: "tempLow",
    highField: "tempHigh",
  },
  {
    name: "attenuationRange",
    min: 0,
    max: 1,
    lowField: "attenuationLow",
    highField: "attenuationHigh",
  },
];

const YeastEditorActions = () => {
  return [<AppBarItem key="save" text="Save" type="submit" icon={<Save />} />];
};
export function YeastEditor({ src, action }: YeastEditorProps) {
  const { state, register, control, getValues, formAction } =
    useActionForm<YeastInput>(action, src!);
  return (
    <Form className="flex" action={formAction}>
      <AppBarLayout
        title={`Yeast Editor: ${src?.name}`}
        actions={<YeastEditorActions />}
      >
        <div className="grid grid-cols-4 gap-2">
          <div className="m-2 border-2 flex flex-col rounded-sm col-span-4 ">
            <span className="flex-shrink p-2 block bg-slate-300">General</span>
            <div className="flex-grow">
              <Input type="hidden" {...register("id")} />
              <TextField {...register("name")} />
              <TextField {...register("manufacturer")} />
              <NumberField {...register("attenuation")} step={0.001} />
              <TextField {...register("notes")} />
              <Select {...register("type")} options={YeastType} />
              <Select
                {...register("flocculation")}
                options={YeastFlocculation}
              />
              <Select {...register("form")} options={YeastForm} />
              {rangeProps.map(({ name, highField, lowField, min, max }) => (
                <Controller
                  key={name}
                  name={name!}
                  control={control}
                  defaultValue={
                    getValues([lowField!, highField!]).reduce(
                      (acc, v, i) => ({
                        ...acc,
                        [i === 0 ? "min" : "max"]: v!,
                      }),
                      {} as RangeValue,
                    ) as RangeValue
                  }
                  render={({ field }) => (
                    <RangeField
                      error={state.errors?.[name!]}
                      {...field}
                      value={field.value ?? { min: 0, max: 100 }}
                      label={name}
                      step={0.01}
                      min={min ?? 0}
                      max={max ?? 40}
                    />
                  )}
                />
              ))}
              <TextField {...register("description")} />
            </div>
          </div>
        </div>
      </AppBarLayout>
    </Form>
  );
}

export default YeastEditor;
