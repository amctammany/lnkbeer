"use client";
import { AppBarLayout } from "@/components/AppBarLayout";
import { Form } from "@/components/Form/Form";
import { Input } from "@/components/Form/Input";
import { TextField } from "@/components/Form/TextField";
import Section from "@/components/Section";
import { useActionForm } from "@/hooks/useActionForm";
import { ExtendedFermentationProfile } from "@/types/Profile";
import { Plus, Thermometer } from "lucide-react";
import { FermentationStepListItem } from "./FermentationStepListItem";
import Link from "next/link";
import FermentationStepActions from "./FermentationStepActions";
import { AppBarItem } from "@/components/AppBarItem";
import { FermentationProfileFormActions } from "./FermentationProfileFormActions";
import AppBarTitle from "@/components/AppBarTitle";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FermentationProfileSchema,
  fermentationProfileSchema,
} from "@/schemas/fermentationProfileSchema";
import { List } from "@/components/List/List";

export type FermentationProfileFormProps = {
  src?: ExtendedFermentationProfile | null;
  action: any;
};

export function FermentationProfileForm({
  src,
  action,
}: FermentationProfileFormProps) {
  const {
    register,
    handleSubmit,
    formState: state,
  } = useForm<FermentationProfileSchema>({
    defaultValues: src!,
    resolver: zodResolver(fermentationProfileSchema),
  });

  const title = src?.name
    ? `FermentationProfile Editor: ${src?.name}`
    : "FermentationProfile Creator";
  return (
    <Form className="flex" onSubmit={handleSubmit(action)}>
      <AppBarLayout
        title={
          <AppBarTitle icon={<Thermometer />}>
            {src?.name ?? "Creator"}
          </AppBarTitle>
        }
        actions={<FermentationProfileFormActions src={src} />}
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
                url={`/profiles/fermentation/${src?.slug}/edit/new`}
                text="Add"
                icon={<Plus />}
              />,
            ]}
          >
            <List>
              {src?.steps.map((step, index) => (
                <FermentationStepListItem
                  key={step.id}
                  href={`/profiles/fermentation/${src?.slug}/edit/${step.id}`}
                  scroll={false}
                  src={step}
                  index={index}
                >
                  <FermentationStepActions
                    className="mx-2 hidden md:block"
                    src={{ FermentationProfile: src, ...step }}
                  />
                </FermentationStepListItem>
              ))}
            </List>
          </Section>
        </div>
      </AppBarLayout>
    </Form>
  );
}

export default FermentationProfileForm;
