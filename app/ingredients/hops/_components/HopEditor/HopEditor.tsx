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
        <div className="">
          <Input type="hidden" {...register("id")} />
          <TextField {...register("name")} />
          <TextField {...register("description")} />
          <Select
            {...register("usage")}
            className="w-full"
            options={HopUsage}
          />

          <NumberField {...register("alpha")} step={0.1} />
        </div>
      </AppBarLayout>
    </Form>
  );
}

export default HopEditor;
