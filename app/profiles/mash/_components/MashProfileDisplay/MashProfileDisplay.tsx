import { Prop } from "@/components/Prop";
import { AppBarLayout } from "@/components/AppBarLayout";
import { ExtendedMashProfile } from "@/types/Profile";
import { MashStepListItem } from "../MashProfileForm/MashStepListItem";
import { Section } from "@/components/Section";
import MashProfileDisplayActions from "./MashProfileDisplayActions";
import Link from "next/link";
import AppBarTitle from "@/components/AppBarTitle";
import { Thermometer } from "lucide-react";

export type MashProfileDisplayProps = {
  src?: ExtendedMashProfile | null;
};

export function MashProfileDisplay({ src }: MashProfileDisplayProps) {
  return (
    <AppBarLayout
      title={<AppBarTitle icon={<Thermometer />}>{src?.name}</AppBarTitle>}
      actions={<MashProfileDisplayActions src={src} />}
    >
      <div className="gap-2 lg:w-9/12 mx-auto">
        <Section title="General" className="m-4  ">
          <div className="p-0 *:border-b-2 last-of-type:*:border-b-0">
            <Prop label="Name" value={src?.name} />
            <Prop label="Description" value={src?.description} />
            <Prop
              label="Forked From"
              value={
                <Link
                  className="underline"
                  href={`/profiles/equipment/${src?.origin?.slug}`}
                >
                  {src?.origin?.name}
                </Link>
              }
            />

            <Prop label="Forks" value={src?.forks.length} />
          </div>
        </Section>
        <Section title="Steps" className="m-4  ">
          <ol className="list-decimal list-outside pl-6">
            {(src?.steps ?? []).map((step, index) => (
              <li
                key={step.id}
                className="list-item leading-4 py-2 px-1 hover:bg-slate-200 "
              >
                <MashStepListItem src={step} index={index} />
              </li>
            ))}
          </ol>
        </Section>
      </div>
      ;
    </AppBarLayout>
  );
}

export default MashProfileDisplay;
