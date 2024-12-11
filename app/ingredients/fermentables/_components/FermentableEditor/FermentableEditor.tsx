"use client";
import { AppBarAction } from "@/components/AppBar";
import { AppBarLayout } from "@/components/AppBarLayout";
import { Form } from "@/components/Form/Form";
import { Input } from "@/components/Form/Input";
import { NumberField } from "@/components/Form/NumberField";
//import { NumberField } from "@/components/Form/NumberField";
//import { RangeField } from "@/components/Form/RangeField";
//import { RangeValue } from "@/components/Form/RangeSlider";
//import { Select } from "@/components/Form/Select";
import { TextField } from "@/components/Form/TextField";
import { useActionForm } from "@/hooks/useActionForm";
import { FermentableInput } from "@/types/ingredient";
import { Save } from "lucide-react";

export type FermentableEditorProps = {
  src?: FermentableInput | null;
  action: any;
};
const FermentableEditorActions = ({
  src,
}: {
  src?: FermentableInput | null;
}) => {
  return [<AppBarAction key="save" text="Save" icon={<Save />} />];
};

export function FermentableEditor({ src, action }: FermentableEditorProps) {
  const { state, register, control, getValues, formAction } =
    useActionForm<FermentableInput>(action, src!);
  return (
    <Form className="flex" action={formAction}>
      <AppBarLayout
        title={`Fermentable Editor: ${src?.name}`}
        actions={<FermentableEditorActions src={src} />}
      >
        <div className="grid grid-cols-4 gap-2">
          <div className="m-2 border-2 flex flex-col rounded-sm col-span-4 ">
            <span className="flex-shrink p-2 block bg-slate-300">General</span>
            <div className="flex-grow">
              <Input type="hidden" {...register("id")} />
              <TextField {...register("name")} />
              <TextField {...register("country")} />
              <NumberField {...register("color")} step={0.01} />
              <NumberField {...register("potential")} step={0.001} />
              <NumberField {...register("power")} step={0.01} />
              <TextField {...register("notes")} />

              <TextField {...register("description")} />
            </div>
          </div>
        </div>
      </AppBarLayout>
    </Form>
  );
}

export default FermentableEditor;
