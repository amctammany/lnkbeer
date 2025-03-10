"use client";
import { Prop } from "@/components/Prop";
import { Card } from "@/components/ui/card";
import {
  CharacteristicAroma,
  Hop as HopType,
  HopNote,
  HopSensoryPanel,
} from "@prisma/client";

import { createHopNote, updateHopNote } from "../../actions";
import HopSensoryEditorForm, { HopNoteInput } from "./HopSensoryEditorForm";
import { useActionForm } from "@/hooks/useActionForm";
import { Form } from "@/components/Form/Form";
import { AppBarLayout } from "@/components/AppBarLayout";
import AppBarTitle from "@/components/AppBarTitle";
import { Hop } from "lucide-react";
import { HopSensoryEditorActions } from "./HopSensoryEditorActions";

export type HopSensoryEditorProps = {
  hopNote?:
    | (HopNote & {
        aromaIds: string[];
        hop: HopType;
        sensoryPanel: HopSensoryPanel & {
          aromas?: CharacteristicAroma[];
          aromaIds?: string[];
        };
      })
    | null;

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
    acc[prop] = ((hopNote?.sensoryPanel?.[prop] ?? 0) * 10)?.toString();
    return acc;
  }, {});
  const { state, register, control, getValues, formAction } =
    useActionForm<HopNoteInput>(
      hopNote?.uid ? updateHopNote : createHopNote,
      {
        ...hopNote,
        sensoryPanel,
      }!,
    );

  return (
    <Form action={formAction}>
      <AppBarLayout
        title={<AppBarTitle icon={<Hop />}>{src?.name}</AppBarTitle>}
        actions={<HopSensoryEditorActions />}
      >
        <div className="">
          <Card className="m-4 *:border-b-2 *:last-of-type:border-b-0 ">
            <h4>Notes</h4>
            <Prop label="Name" value={src?.name} />
            <HopSensoryEditorForm
              action={hopNote?.uid ? updateHopNote : createHopNote}
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
