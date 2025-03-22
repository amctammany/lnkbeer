"use client";
import { Card } from "@/components/ui/card";
import { CharacteristicAroma, Hop as HopType } from "@prisma/client";

import { createHopNote, updateHopNote } from "../../actions";
import HopSensoryEditorForm, { HopNoteInput } from "./HopSensoryEditorForm";
import { Form } from "@/components/Form/Form";
import { AppBarLayout } from "@/components/AppBarLayout";
import AppBarTitle from "@/components/AppBarTitle";
import { Hop } from "lucide-react";
import { HopSensoryEditorActions } from "./HopSensoryEditorActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { HopNoteSchema, hopNoteSchema } from "@/schemas/hopSchema";
import { useForm } from "react-hook-form";

export type HopSensoryEditorProps = {
  hopNote?: HopNoteInput;
  src?: HopType | null;
  aromas: CharacteristicAroma[];
};
export function HopSensoryEditor({
  src,
  hopNote,
  aromas,
}: HopSensoryEditorProps) {
  const sensoryPanel = [
    "stoneFruit",
    "berry",
    "pomme",
    "melon",
    "tropical",
    "citrus",
    "sweetAromatic",
    "floral",
    "herbal",
    "vegetal",
    "grassy",
    "earthy",
    "woody",
    "spicy",
    "onionGarlic",
    "driedFruit",
    "dank",
  ].reduce((acc, prop) => {
    acc[prop] = ((hopNote?.sensoryPanel?.[prop] ?? 0) * 1)?.toString();
    return acc;
  }, {});
  //const { state, register, control, getValues, formAction } =
  //useActionForm<HopNoteInput>(
  //hopNote?.uid ? updateHopNote : createHopNote,
  //{
  //...hopNote,
  //sensoryPanel,
  //}!,
  //);

  const {
    register,
    //getValues,
    //control,
    handleSubmit,
    formState: state,
  } = useForm<HopNoteSchema>({
    defaultValues: { ...hopNote, sensoryPanel },
    resolver: zodResolver<any>(hopNoteSchema),
  });
  const action = hopNote?.uid ? updateHopNote : createHopNote;
  return (
    <Form onSubmit={handleSubmit(action)}>
      <AppBarLayout
        title={<AppBarTitle icon={<Hop />}>{src?.name}</AppBarTitle>}
        actions={
          <HopSensoryEditorActions
            disabled={state.isSubmitting || state.isSubmitted}
          />
        }
      >
        <div className="pt-2 lg:pt-4">
          <Card className="m-1 lg:m-4 *:border-b-2 *:last-of-type:border-b-0 ">
            <HopSensoryEditorForm
              action={hopNote?.uid ? updateHopNote : createHopNote}
              disabled={state.isSubmitting || state.isSubmitted}
              register={register}
              src={hopNote}
              aromas={aromas}
            />
          </Card>
        </div>
      </AppBarLayout>
    </Form>
  );
}

export default HopSensoryEditor;
