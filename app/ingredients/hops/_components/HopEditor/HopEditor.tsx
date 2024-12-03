"use client";
import { AppBarAction } from "@/components/AppBar";
import { AppBarLayout } from "@/components/AppBarLayout";
import { Form } from "@/components/Form/Form";
import { Input } from "@/components/Form/Input";
import { NumberField } from "@/components/Form/NumberField";
import { Select } from "@/components/Form/Select";
import { TextField } from "@/components/Form/TextField";
import { Hop, HopUsage } from "@prisma/client";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";

export type HopEditorProps = {
  hop?: Hop | null;
  action: any;
};
const makeActions: (hop: Hop) => AppBarAction[] = (hop) => [
  { text: "Save", icon: Save },
];
export function HopEditor({ hop, action }: HopEditorProps) {
  const { register } = useForm<Hop>({ defaultValues: hop! });
  return (
    <Form className="flex" action={action}>
      <AppBarLayout
        title={`Hop Editor: ${hop?.name}`}
        actions={[{ text: "Save", icon: Save, type: "submit" }]}
      >
        <div className="grid grid-cols-4 gap-2">
          <div className="m-2 border-2 flex flex-col rounded-sm col-span-4 md:col-span-2">
            <span className="flex-shrink p-2 block bg-slate-300">General</span>
            <div className="flex-grow">
              <Input type="hidden" {...register("id")} />
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
            </div>
          </div>
        </div>
      </AppBarLayout>
    </Form>
  );
}

export default HopEditor;
