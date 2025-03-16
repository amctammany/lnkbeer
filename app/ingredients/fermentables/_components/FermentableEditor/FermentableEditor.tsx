"use client";
import { AppBarLayout } from "@/components/AppBarLayout";
import { Form } from "@/components/Form/Form";
import { Input } from "@/components/Form/Input";
import { NumberField } from "@/components/Form/NumberField";
import { TextField } from "@/components/Form/TextField";
import { zodResolver } from "@hookform/resolvers/zod";
import { FermentableInput } from "@/types/ingredient";
import { FermentableEditorActions } from "./FermentableEditorActions";
import { Wheat } from "lucide-react";
import AppBarTitle from "@/components/AppBarTitle";
import { useForm } from "react-hook-form";
import { fermentableSchema } from "@/schemas/fermentableSchema";

export type FermentableEditorProps = {
  fermentable: FermentableInput;
  action: any;
};
export function FermentableEditor({
  fermentable,
  action,
}: FermentableEditorProps) {
  //const { state, register, control, getValues, formAction } =
  //useActionForm<FermentableInput>(action, fermentable);
  //console.log(state);
  const {
    register,
    handleSubmit,
    formState: state,
  } = useForm({
    defaultValues: fermentable,
    resolver: zodResolver(fermentableSchema),
  });
  return (
    <Form className="flex" onSubmit={handleSubmit(action)}>
      <AppBarLayout
        title={
          <AppBarTitle icon={<Wheat />}>
            {fermentable?.name ?? "Fermentable Creator"}
          </AppBarTitle>
        }
        actions={<FermentableEditorActions />}
      >
        <div className="grid grid-cols-4 gap-2">
          <div className="m-2 border-2 flex flex-col rounded-sm col-span-4 ">
            <span className="shrink p-2 block bg-slate-300">General</span>
            <div className="grow">
              <Input type="hidden" {...register("id")} />
              <TextField {...register("name")} />
              <TextField {...register("country")} />
              <NumberField
                {...register("color")}
                step={0.01}
                error={state.errors?.color}
              />
              <NumberField
                {...register("potential")}
                step={0.001}
                error={state.errors?.potential}
              />
              <NumberField
                {...register("power")}
                step={0.01}
                error={state.errors?.power}
              />
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
