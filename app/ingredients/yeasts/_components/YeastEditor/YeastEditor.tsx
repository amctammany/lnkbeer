"use client";
import { AppBarItem } from "@/components/AppBarItem";
import { AppBarLayout } from "@/components/AppBarLayout";
import { AppBarTitle } from "@/components/AppBarTitle";
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
import { YeastSchema, yeastSchema } from "@/schemas/yeastSchema";
import { RangeValue, YeastInput } from "@/types/ingredient";
import { zodResolver } from "@hookform/resolvers/zod";
import { YeastFlocculation, YeastForm, YeastType } from "@prisma/client";
import { FlaskConical, Save } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

export type YeastEditorProps = {
  yeast?: YeastSchema | null;
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
    max: 100,
    lowField: "attenuationLow",
    highField: "attenuationHigh",
  },
];

const YeastEditorActions = () => {
  return [<AppBarItem key="save" text="Save" type="submit" icon={<Save />} />];
};
export function YeastEditor({ yeast, action }: YeastEditorProps) {
  //const { state, register, control, getValues, formAction } =
  //useActionForm<YeastInput>(action, src!);
  const {
    register,
    getValues,
    control,
    handleSubmit,
    formState: state,
  } = useForm<YeastSchema>({
    defaultValues: yeast!,
    resolver: zodResolver<any>(yeastSchema),
  });
  return (
    <Form className="flex" onSubmit={handleSubmit(action)}>
      <AppBarLayout
        title={<AppBarTitle icon={<FlaskConical />}>{yeast?.name}</AppBarTitle>}
        actions={<YeastEditorActions />}
      >
        <div className="grid grid-cols-4 gap-2">
          <div className="m-2 border-2 flex flex-col rounded-sm col-span-4 ">
            <span className="shrink p-2 block bg-slate-300">General</span>
            <div className="grow">
              <Input type="hidden" {...register("id")} />
              <Input type="hidden" {...register("userId")} />
              <TextField {...register("name")} />
              <TextField {...register("manufacturer")} />
              <NumberField
                {...register("attenuation")}
                step={0.001}
                error={state.errors?.attenuation}
              />
              <TextField {...register("notes")} error={state.errors?.notes} />
              <Select
                {...register("type")}
                options={YeastType}
                error={state.errors?.type}
              />
              <Select
                {...register("flocculation")}
                error={state.errors?.flocculation}
                options={YeastFlocculation}
              />
              <Select
                {...register("form")}
                options={YeastForm}
                error={state.errors?.form}
              />
              {rangeProps.map(({ name, highField, lowField, min, max }) => (
                <Controller
                  key={name}
                  name={name!}
                  control={control}
                  defaultValue={getValues<any>([lowField!, highField!]).reduce(
                    (acc, v, i) => ({
                      ...acc,
                      [i === 0 ? "min" : "max"]: v!,
                    }),
                    {} as RangeValue,
                  )}
                  render={({ field }) => (
                    <RangeField
                      errors={[
                        state.errors?.[lowField!],
                        state.errors?.[highField!],
                      ]}
                      {...field}
                      //onChange={(e) => console.log(e)}
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
