"use client";
import { AppBarItem } from "@/components/AppBarItem";
import { AppBarLayout } from "@/components/AppBarLayout";
import AppBarTitle from "@/components/AppBarTitle";
import { Form } from "@/components/Form/Form";
import { Input } from "@/components/Form/Input";
import { NumberField } from "@/components/Form/NumberField";
import { RangeField, RangeFieldProp } from "@/components/Form/RangeField";
//import { RangeValue } from "@/components/Form/RangeSlider";
import { Select } from "@/components/Form/Select";
import { TextField } from "@/components/Form/TextField";
import Section from "@/components/Section";
import { HopSchema, hopSchema } from "@/schemas/hopSchema";
import { HopInput, RangeValue } from "@/types/ingredient";
import { zodResolver } from "@hookform/resolvers/zod";
import { Hop, HopUsage } from "@prisma/client";
import { HopIcon, Save } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

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
  return [<AppBarItem key="save" text="Save" type="submit" icon={<Save />} />];
};

export function HopEditor({ hop, action }: HopEditorProps) {
  //const { state, register, control, getValues, formAction } =
  //useActionForm<HopInput>(action, hop!);
  const {
    register,
    getValues,
    control,
    handleSubmit,
    formState: state,
  } = useForm<HopInput>({
    defaultValues: hop!,
    resolver: zodResolver<any>(hopSchema),
  });
  console.log(state);

  return (
    <Form className="flex" onSubmit={handleSubmit(action)}>
      <AppBarLayout
        title={
          <AppBarTitle icon={<HopIcon />}>{hop?.name ?? "Creator"}</AppBarTitle>
        }
        actions={<HopEditorActions />}
      >
        <div className="grid grid-cols-4 gap-2">
          <Section
            title="General"
            className="m-2 border-2 flex flex-col rounded-sm col-span-4 lg:col-span-2"
          >
            <div className="grow">
              <Input type="hidden" {...register("id")} />
              <Input type="hidden" {...register("userId")} />
              <Input type="hidden" {...register("slug")} />

              <TextField {...register("name")} />
              <TextField {...register("description")} />
              <Select
                {...register("usage")}
                className="w-full"
                options={HopUsage}
                error={state.errors?.usage}
              />
            </div>
          </Section>

          <Section title="Composition" className="col-span-4 lg:col-span-2">
            <div className="grow grid grid-cols-2 lg:grid-cols-3">
              <NumberField
                suffix="%"
                {...register("alpha")}
                error={state.errors?.alpha}
                step={0.01}
              />
              <NumberField
                suffix="%"
                {...register("beta")}
                step={0.01}
                error={state.errors?.beta}
              />
              <NumberField
                suffix="%"
                {...register("caryophyllene")}
                step={0.01}
                error={state.errors?.caryophyllene}
              />
              <NumberField
                suffix="%"
                {...register("cohumulone")}
                step={0.01}
                error={state.errors?.cohumulone}
              />
              <NumberField
                suffix="%"
                {...register("humulene")}
                step={0.01}
                error={state.errors?.humulene}
              />
              <NumberField
                suffix="%"
                {...register("farnesene")}
                error={state.errors?.farnesene}
                step={0.01}
              />
              <NumberField
                suffix="%"
                {...register("myrcene")}
                step={0.01}
                error={state.errors?.myrcene}
              />

              <NumberField
                suffix="g/mL"
                {...register("totalOil")}
                step={0.01}
                error={state.errors?.totalOil}
              />
            </div>
          </Section>
          <Section title="Ranges" className="col-span-4 ">
            {rangeProps.map(({ name, min, max, highField, lowField }) => (
              <Controller
                key={name}
                name={name!}
                control={control}
                defaultValue={
                  (
                    (getValues([lowField!, highField!]) as number[]) ?? []
                  ).reduce(
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
                    max={max ?? 100}
                  />
                )}
              />
            ))}
          </Section>
        </div>
      </AppBarLayout>
    </Form>
  );
}

export default HopEditor;
