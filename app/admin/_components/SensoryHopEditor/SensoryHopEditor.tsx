"use client";
import { AppBarItem } from "@/components/AppBarItem";
import { Form } from "@/components/Form/Form";
import { TextArea } from "@/components/Form/TextArea";
import { Prop } from "@/components/Prop";
import Section from "@/components/Section";
import { hopNoteSchema, HopNoteSchema } from "@/schemas/hopSchema";
import { ExtendedHop, ExtendedHopNote } from "@/types/ingredient";
import type {
  CharacteristicAroma,
  HopNote,
  HopSensoryPanel,
  User,
} from "@prisma/client";
import { Save, SquareArrowOutUpRight } from "lucide-react";
import { useForm } from "react-hook-form";
import HopAromaForm from "./HopAromaForm";
import { lowerFirst } from "@/lib/utils";
import { TextField } from "@/components/Form/TextField";
import { NumberField } from "@/components/Form/NumberField";
import { zodResolver } from "@hookform/resolvers/zod";

export interface SensoryHopEditorProps {
  //user?: ExtendedUser | null;
  hop?: ExtendedHop;
  note: ExtendedHopNote; // Pick<HopSensoryPanel, "id" | "hopId" | "year">[];
  action?: any;
  aromas: CharacteristicAroma[];
  //children: React.ReactNode;
}

export const SensoryHopEditor = ({
  note,
  hop,
  aromas,
  action,
}: SensoryHopEditorProps) => {
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
    acc[prop] = ((note?.sensoryPanel?.[prop] ?? 0) * 1)?.toString();
    return acc;
  }, {});

  const {
    handleSubmit,
    register,
    getValues,
    formState: state,
  } = useForm<HopNoteSchema>({
    defaultValues: { ...note, sensoryPanel },
    resolver: zodResolver(hopNoteSchema),
  });
  const disabled = false;
  const aromaRegister = register("sensoryPanel.aromaIds", {
    value: (note?.sensoryPanel?.aromas ?? []).map(({ id }) => id),
  });

  console.log(state);
  return (
    <div className="mx-auto lg:w-10/12 flex flex-col gap-0">
      <Form onSubmit={handleSubmit(action)}>
        <Section
          title="Sensory Editor"
          actions={[
            <AppBarItem
              icon={<Save />}
              text="Save"
              //action={() => console.log("foo")}
              type="submit"
              key="save"
            />,
          ]}
        >
          <div className="grid auto-rows-auto w-full">
            <input type="hidden" {...register("id")} />
            <input type="hidden" {...register("userId")} />
            <input type="hidden" {...register("userEmail")} />
            <input type="hidden" {...register("hopId")} />
            <input type="hidden" {...register("slug", { value: hop?.slug })} />
            <input
              type="hidden"
              {...register("sensoryPanel.id", {
                value: note?.sensoryPanel?.id,
              })}
            />
            <div className="flex">
              <NumberField {...register("year", { valueAsNumber: true })} />
              <TextField {...register("producer")} />
              <TextField {...register("lot")} />
            </div>
            <div>
              <TextArea
                {...register("sensoryPanel.notes")}
                disabled={disabled}
                label="Notes"
              />
            </div>
            <div className="grid grid-cols-1">
              {[
                "StoneFruit",
                "Pomme",
                "Berry",
                "Melon",
                "Tropical",
                "Citrus",
                "Floral",
                "Herbal",
                "Vegetal",
                "Grassy",
                "Woody",
                "Spicy",
                "OnionGarlic",
                "DriedFruit",
                "Dank",
              ].map((k) => (
                <HopAromaForm
                  aromas={aromas.filter(({ group }) => group === k)}
                  disabled={disabled}
                  key={k}
                  label={k}
                  name={`sensoryPanel.${lowerFirst(k)}`}
                  rangeProps={register(`sensoryPanel.${lowerFirst(k)}` as any, {
                    value: (note.sensoryPanel?.[lowerFirst(k)] * 1).toString(),
                  })}
                  aromaProps={aromaRegister}
                />
              ))}
            </div>
          </div>
        </Section>
      </Form>
    </div>
  );
};
export default SensoryHopEditor;
