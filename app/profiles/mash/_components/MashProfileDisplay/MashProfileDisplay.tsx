import { Prop } from "@/components/Prop";
import { ExtendedMashProfile } from "@/types/Profile";
import { MashStepListItem } from "../MashProfileForm/MashStepListItem";
import { Section } from "@/components/Section";
import Link from "next/link";

export type MashProfileDisplayProps = {
  src?: ExtendedMashProfile | null;
};

export function MashProfileDisplay({ src }: MashProfileDisplayProps) {
  return (
    <div className="pt-2 lg:gap-2 lg:w-9/12 mx-auto">
      <Section title="General" className="m-2 lg:m-4  ">
        <div className="p-0 *:border-b-2 *:last-of-type:border-b-0">
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
      <Section title="Steps" className="m-2 lg:m-4  ">
        <ol className="">
          {(src?.steps ?? []).map((step, index) => (
            <MashStepListItem key={step.id} src={step} index={index} />
          ))}
        </ol>
      </Section>
    </div>
  );
}
/**<li
              key={step.id}
              className="list-item leading-4 py-2 px-1 hover:bg-slate-200 "
            >
            </li>
   */
export default MashProfileDisplay;
