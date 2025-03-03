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

export type FermentationProfileFormProps = {
  src?: ExtendedFermentationProfile | null;
  action: any;
};

export function FermentationProfileForm({
  src,
  action,
}: FermentationProfileFormProps) {
  const { state, register, formAction } =
    useActionForm<ExtendedFermentationProfile>(action, src!);
  const title = src?.name
    ? `FermentationProfile Editor: ${src?.name}`
    : "FermentationProfile Creator";
  return (
    <Form className="flex" action={formAction}>
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
            <ol className="list-decimal list-outside pl-6">
              {src?.steps.map((step, index) => (
                <li
                  key={step.id}
                  className="list-item leading-4 py-2 px-1 hover:bg-slate-200 "
                >
                  <div className="flex w-full p-1">
                    <Link
                      className="grow "
                      href={`/profiles/fermentation/${src?.slug}/edit/${step.id}`}
                      scroll={false}
                    >
                      <FermentationStepListItem
                        key={step.id}
                        src={step}
                        index={index}
                      />
                    </Link>
                    <FermentationStepActions
                      className="mx-2 hidden md:block"
                      src={{ FermentationProfile: src, ...step }}
                    />
                  </div>
                </li>
              ))}
            </ol>
          </Section>
        </div>
      </AppBarLayout>
    </Form>
  );
}

export default FermentationProfileForm;
