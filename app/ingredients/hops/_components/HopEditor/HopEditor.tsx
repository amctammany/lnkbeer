"use client";
import { AppBarAction } from "@/components/AppBar";
import { AppBarLayout } from "@/components/AppBarLayout";
import { Form } from "@/components/Form/Form";
import { Input } from "@/components/Form/Input";
import { NumberField } from "@/components/Form/NumberField";
import { RangeField, RangeFieldProp } from "@/components/Form/RangeField";
//import { RangeValue } from "@/components/Form/RangeSlider";
import { Select } from "@/components/Form/Select";
import { TextField } from "@/components/Form/TextField";
import { useActionForm } from "@/hooks/useActionForm";
import { HopInput, RangeValue } from "@/types/ingredient";
import { HopUsage } from "@prisma/client";
import { Save } from "lucide-react";
import { Controller } from "react-hook-form";

export type HopEditorProps = {
  hop?: HopInput | null;
  action: any;
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
    max: 30,
    lowField: "caryophylleneLow",
    highField: "caryophylleneHigh",
  },
  {
    name: "cohumuloneRange",
    min: 0,
    max: 80,
    lowField: "cohumuloneLow",
    highField: "cohumuloneHigh",
  },
  {
    name: "farneseneRange",
    min: 0,
    max: 50,
    lowField: "farneseneLow",
    highField: "farneseneHigh",
  },
  {
    name: "humuleneRange",
    min: 0,
    max: 80,
    highField: "humuleneHigh",
    lowField: "humuleneLow",
  },
  {
    name: "myrceneRange",
    min: 0,
    max: 80,
    highField: "myrceneHigh",
    lowField: "myrceneLow",
  },
  {
    name: "totalOilRange",
    min: 0,
    max: 30,
    lowField: "totalOilLow",
    highField: "totalOilHigh",
  },
];
const HopEditorActions = () => {
  return [
    <AppBarAction key="save" text="Save" type="submit" icon={<Save />} />,
  ];
};

export function HopEditor({ hop, action }: HopEditorProps) {
  const { state, register, control, getValues, formAction } =
    useActionForm<HopInput>(action, hop!);
  return (
    <Form className="flex" action={formAction}>
      <AppBarLayout
        title={`Hop Editor: ${hop?.name}`}
        actions={<HopEditorActions />}
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
