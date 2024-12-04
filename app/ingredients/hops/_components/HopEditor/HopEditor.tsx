"use client";
import { AppBarLayout } from "@/components/AppBarLayout";
import { Form } from "@/components/Form/Form";
import { Input } from "@/components/Form/Input";
import { NumberField } from "@/components/Form/NumberField";
import { RangeField } from "@/components/Form/RangeField";
//import { RangeValue } from "@/components/Form/RangeSlider";
import { Select } from "@/components/Form/Select";
import { TextField } from "@/components/Form/TextField";
import { useActionForm } from "@/hooks/useActionForm";
import { HopInput, RangeValue } from "@/types/ingredient";
import { Hop, HopUsage } from "@prisma/client";
import { Save } from "lucide-react";
import { Controller, FieldValues, useForm } from "react-hook-form";

export type HopEditorProps = {
  hop?: HopInput | null;
  action: any;
};
export type NumberKeys<T extends object> = {
  [K in keyof T]: NonNullable<T[K]> extends number ? K : never;
}[keyof T];
export type RangeKeys<T extends object> = {
  [K in keyof T]: NonNullable<T[K]> extends RangeValue ? K : never;
}[keyof T];
type RangeFieldProp<T extends FieldValues> = {
  name: Required<RangeKeys<T>>;
  lowField: Required<NumberKeys<T>>;
  highField: Required<NumberKeys<T>>;
  min?: number;
  max?: number;
};
const rangeProps: RangeFieldProp<HopInput>[] = [
  {
    name: "alphaRange",
    min: 0,
    max: 50,
    lowField: "alphaLow",
    highField: "alphaHigh",
  },
  {
    name: "betaRange",
    min: 0,
    max: 50,
    lowField: "betaLow",
    highField: "betaHigh",
  },
  {
    name: "caryophylleneRange",
    min: 0,
    max: 50,
    lowField: "caryophylleneLow",
    highField: "caryophylleneHigh",
  },
  {
    name: "cohumuloneRange",
    min: 0,
    max: 50,
    lowField: "cohumuloneLow",
    highField: "cohumuloneHigh",
  },
  {
    name: "farneseneRange",
    min: 0,
    max: 50,
    highField: "farneseneLow",
    lowField: "farneseneHigh",
  },
  {
    name: "humuleneRange",
    min: 0,
    max: 50,
    highField: "humuleneLow",
    lowField: "humuleneHigh",
  },
  {
    name: "myrceneRange",
    min: 0,
    max: 50,
    highField: "myrceneHigh",
    lowField: "myrceneLow",
  },
  {
    name: "totalOilRange",
    min: 0,
    max: 50,
    lowField: "totalOilLow",
    highField: "totalOilHigh",
  },
];
export function HopEditor({ hop, action }: HopEditorProps) {
  const { state, register, control, getValues, formAction } =
    useActionForm<HopInput>(action, hop!);
  return (
    <Form className="flex" action={formAction}>
      <AppBarLayout
        title={`Hop Editor: ${hop?.name}`}
        actions={[{ text: "Save", icon: Save, type: "submit" }]}
      >
        <div className="grid grid-cols-4 gap-2">
          <div className="m-2 border-2 flex flex-col rounded-sm col-span-4 md:col-span-2">
            <span className="flex-shrink p-2 block bg-slate-300">General</span>
            <div className="flex-grow">
              <Input
                type="hidden"
                {...register("id", { valueAsNumber: true })}
              />
              <TextField {...register("name")} />
              <TextField {...register("description")} />
              <Select
                {...register("usage")}
                className="w-full"
                options={HopUsage}
              />
            </div>
          </div>

          <div className="m-2 border-2 flex flex-col rounded-sm col-span-4 md:col-span-2">
            <span className="flex-shrink p-2 block bg-slate-300">
              Composition
            </span>
            <div className="flex-grow">
              <NumberField suffix="%" {...register("alpha")} step={0.01} />
              <NumberField {...register("beta")} step={0.01} />
              <NumberField {...register("caryophyllene")} step={0.01} />
              <NumberField {...register("cohumulone")} step={0.01} />
              <NumberField {...register("humulene")} step={0.01} />
              <NumberField {...register("farnesene")} step={0.01} />
              <NumberField {...register("myrcene")} step={0.01} />

              <NumberField {...register("totalOil")} step={0.01} />
              {rangeProps.map(({ name, highField, lowField }) => (
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
                      min={0}
                      max={40}
                    />
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </AppBarLayout>
    </Form>
  );
}

export default HopEditor;
