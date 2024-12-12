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
import { Button } from "@/components/ui/button";
import MashStepActions from "./MashStepActions";
import { AppBarItem } from "@/components/AppBarItem";

export type MashProfileFormProps = {
  src?: ExtendedMashProfile | null;
  action: any;
};
const MashProfileFormActions = ({
  src,
}: {
  src?: ExtendedMashProfile | null;
}) => {
  return [<AppBarItem key="save" text="Save" type="submit" icon={<Save />} />];
};

export function MashProfileForm({ src, action }: MashProfileFormProps) {
  const { state, register, formAction } = useActionForm<ExtendedMashProfile>(
    action,
    src!,
  );
  const title = src?.name
    ? `MashProfile Editor: ${src?.name}`
    : "MashProfile Creator";
  return (
    <Form className="flex" action={formAction}>
      <AppBarLayout
        title={title}
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
                      className="flex-grow "
                      href={`/profiles/mash/${src?.slug}/edit/${step.id}`}
                      scroll={false}
                    >
                      <MashStepListItem
                        key={step.id}
                        src={step}
                        index={index}
                      />
                    </Link>
                    <MashStepActions
                      className="mx-2"
                      src={{ MashProfile: src, ...step }}
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

export default MashProfileForm;
