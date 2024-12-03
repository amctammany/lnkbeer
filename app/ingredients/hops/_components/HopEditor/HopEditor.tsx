"use client";
import { AppBarAction } from "@/components/AppBar";
import { AppBarLayout } from "@/components/AppBarLayout";
import { Form } from "@/components/Form/Form";
import { Input } from "@/components/Form/Input";
import { NumberField } from "@/components/Form/NumberField";
import { RangeField } from "@/components/Form/RangeField";
import { RangeValue } from "@/components/Form/RangeSlider";
import { Select } from "@/components/Form/Select";
import { TextField } from "@/components/Form/TextField";
import { useActionForm } from "@/hooks/useActionForm";
import { HopInput } from "@/types/ingredient";
import { Hop, HopUsage } from "@prisma/client";
import { Save } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

export type HopEditorProps = {
  hop?: HopInput | null;
  action: any;
};
const makeActions: (hop: Hop) => AppBarAction[] = (hop) => [
  { text: "Save", icon: Save },
];
export function HopEditor({ hop, action }: HopEditorProps) {
  const { state, register, control, getValues, formAction } =
    useActionForm<HopInput>(action, hop!);
  console.log(state);
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
              <NumberField {...register("alpha")} step={0.01} />
              <NumberField {...register("beta")} step={0.01} />
              <NumberField {...register("caryophyllene")} step={0.01} />
              <NumberField {...register("cohumulone")} step={0.01} />
              <NumberField {...register("humulene")} step={0.01} />
              <NumberField {...register("farnesene")} step={0.01} />
              <NumberField {...register("myrcene")} step={0.01} />

              <NumberField {...register("totalOil")} step={0.01} />
              <Controller
                name="alphaRange"
                control={control}
                defaultValue={getValues(["alphaLow", "alphaHigh"]).reduce(
                  (acc, v, i) => ({ ...acc, [i === 0 ? "min" : "max"]: v! }),
                  {} as RangeValue,
                )}
                render={({ field }) => (
                  <RangeField
                    error={state.errors?.alphaRange}
                    {...field}
                    label="Alpha"
                    step={0.01}
                    min={0}
                    max={40}
                  />
                )}
              />

              <Controller
                name="betaRange"
                control={control}
                defaultValue={getValues(["betaLow", "betaHigh"]).reduce(
                  (acc, v, i) => ({ ...acc, [i === 0 ? "min" : "max"]: v! }),
                  {} as RangeValue,
                )}
                render={({ field }) => (
                  <RangeField
                    error={state.errors?.farneseneRange}
                    {...field}
                    label="Beta"
                    step={0.01}
                    min={0}
                    max={35}
                  />
                )}
              />
              <Controller
                name="caryophylleneRange"
                control={control}
                defaultValue={getValues([
                  "caryophylleneLow",
                  "caryophylleneHigh",
                ]).reduce(
                  (acc, v, i) => ({ ...acc, [i === 0 ? "min" : "max"]: v! }),
                  {} as RangeValue,
                )}
                render={({ field }) => (
                  <RangeField
                    error={state.errors?.caryophylleneRange}
                    {...field}
                    label="Caryophyllene"
                    step={0.01}
                    min={0}
                    max={35}
                  />
                )}
              />
              <Controller
                name="humuleneRange"
                control={control}
                defaultValue={getValues(["humuleneLow", "humuleneHigh"]).reduce(
                  (acc, v, i) => ({ ...acc, [i === 0 ? "min" : "max"]: v! }),
                  {} as RangeValue,
                )}
                render={({ field }) => (
                  <RangeField
                    error={state.errors?.humuleneRange}
                    {...field}
                    label="Humulene"
                    step={0.01}
                    min={0}
                    max={35}
                  />
                )}
              />
              <Controller
                name="cohumuloneRange"
                control={control}
                defaultValue={getValues([
                  "cohumuloneLow",
                  "cohumuloneHigh",
                ]).reduce(
                  (acc, v, i) => ({ ...acc, [i === 0 ? "min" : "max"]: v! }),
                  {} as RangeValue,
                )}
                render={({ field }) => (
                  <RangeField
                    error={state.errors?.cohumuloneRange}
                    {...field}
                    label="Cohumulone"
                    step={0.01}
                    min={0}
                    max={35}
                  />
                )}
              />

              <Controller
                name="myrceneRange"
                control={control}
                defaultValue={getValues(["myrceneLow", "myrceneHigh"]).reduce(
                  (acc, v, i) => ({ ...acc, [i === 0 ? "min" : "max"]: v! }),
                  {} as RangeValue,
                )}
                render={({ field }) => (
                  <RangeField
                    error={state.errors?.myrceneRange}
                    {...field}
                    label="Myrcene"
                    step={0.01}
                    min={0}
                    max={50}
                  />
                )}
              />

              <Controller
                name="totalOilRange"
                control={control}
                defaultValue={getValues(["totalOilLow", "totalOilHigh"]).reduce(
                  (acc, v, i) => ({ ...acc, [i === 0 ? "min" : "max"]: v! }),
                  {} as RangeValue,
                )}
                render={({ field }) => (
                  <RangeField
                    error={state.errors?.totalOilRange}
                    {...field}
                    label="Total Oil"
                    step={0.01}
                    min={0}
                    max={35}
                  />
                )}
              />

              <Controller
                name="farneseneRange"
                control={control}
                defaultValue={getValues([
                  "farneseneLow",
                  "farneseneHigh",
                ]).reduce(
                  (acc, v, i) => ({ ...acc, [i === 0 ? "min" : "max"]: v! }),
                  {} as RangeValue,
                )}
                render={({ field }) => (
                  <RangeField
                    error={state.errors?.farneseneRange}
                    {...field}
                    label="Farnesene"
                    step={0.01}
                    min={0}
                    max={35}
                  />
                )}
              />
            </div>
          </div>
        </div>
      </AppBarLayout>
    </Form>
  );
}

export default HopEditor;
