"use client";
import { AppBarLayout } from "@/components/AppBarLayout";
import { Form } from "@/components/Form/Form";
import { Input } from "@/components/Form/Input";
import { TextField } from "@/components/Form/TextField";
import Section from "@/components/Section";
import { useActionForm } from "@/hooks/useActionForm";
import { ExtendedMashProfile, ExtendedMashStep } from "@/types/Profile";
import { MashProfile } from "@prisma/client";
import { Plus, Save } from "lucide-react";
import { MashStepListItem } from "./MashStepListItem";
import Link from "next/link";

export type MashProfileFormProps = {
  src?: ExtendedMashProfile | null;
  action: any;
};

export function MashProfileForm({ src, action }: MashProfileFormProps) {
  const { state, register, control, getValues, formAction } =
    useActionForm<MashProfile>(action, src!);
  return (
    <Form className="flex" action={formAction}>
      <AppBarLayout
        title={`MashProfile Editor: ${src?.name}`}
        actions={[{ text: "Save", icon: Save, type: "submit" }]}
      >
        <div className="gap-2 lg:w-9/12 mx-auto">
          <Section title="General">
            <Input type="hidden" {...register("id")} />
            <TextField {...register("name")} />
            <TextField {...register("description")} />
          </Section>
          <Section title="Steps" actions={[{ text: "Add", icon: Plus }]}>
            <ul>
              {src?.steps.map((step, index) => (
                <Link
                  href={`/profiles/mash/${src?.slug}/edit/${step.id}`}
                  key={step.id}
                >
                  <MashStepListItem
                    src={{ MashProfile: src, ...step }}
                    index={index}
                  />
                </Link>
              ))}
            </ul>
          </Section>
        </div>
      </AppBarLayout>
    </Form>
  );
}

export default MashProfileForm;
