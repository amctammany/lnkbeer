"use client";
import { AppBarLayout } from "@/components/AppBarLayout";
import { Form } from "@/components/Form/Form";
import { Input } from "@/components/Form/Input";
import { TextField } from "@/components/Form/TextField";
import Section from "@/components/Section";
import { ExtendedMashProfile } from "@/types/Profile";
import { Plus, Thermometer } from "lucide-react";
import { MashStepListItem } from "./MashStepListItem";
import MashStepActions from "./MashStepActions";
import { AppBarItem } from "@/components/AppBarItem";
import { MashProfileFormActions } from "./MashProfileFormActions";
import AppBarTitle from "@/components/AppBarTitle";
import {
  mashProfileSchema,
  MashProfileSchema,
} from "@/schemas/mashProfileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { List } from "@/components/List/List";

export type MashProfileFormProps = {
  src?: ExtendedMashProfile | null;
  action: any;
};

export function MashProfileForm({ src, action }: MashProfileFormProps) {
  const {
    register,
    handleSubmit,
    formState: state,
  } = useForm<MashProfileSchema>({
    defaultValues: src!,
    resolver: zodResolver(mashProfileSchema),
  });

  const title = src?.name
    ? `MashProfile Editor: ${src?.name}`
    : "MashProfile Creator";
  return (
    <Form className="flex" onSubmit={handleSubmit(action)}>
      <AppBarLayout
        title={<AppBarTitle icon={<Thermometer />}>{title}</AppBarTitle>}
        actions={<MashProfileFormActions src={src} />}
      >
        <div className="gap-2 lg:w-9/12 mx-auto">
          <Section title="General">
            <Input type="hidden" {...register("id")} />
            <TextField {...register("name")} />
            <TextField {...register("description")} />
          </Section>
          <Section
            title="Steps"
            actions={[
              <AppBarItem
                key="Add"
                url={`/profiles/mash/${src?.slug}/edit/new`}
                text="Add"
                icon={<Plus />}
              />,
            ]}
          >
            <List>
              {src?.steps.map((step, index) => (
                <MashStepListItem
                  href={`/profiles/mash/${src?.slug}/edit/${step.id}`}
                  scroll={false}
                  key={step.id}
                  src={step}
                  index={index}
                >
                  <MashStepActions src={step} />
                </MashStepListItem>
              ))}
            </List>
          </Section>
        </div>
      </AppBarLayout>
    </Form>
  );
}

export default MashProfileForm;
