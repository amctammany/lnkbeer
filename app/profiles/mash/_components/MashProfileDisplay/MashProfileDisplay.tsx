import { Prop } from "@/components/Prop";
import { AppBarAction } from "@/components/AppBar";
import { AppBarLayout } from "@/components/AppBarLayout";
import { ExtendedMashProfile } from "@/types/Profile";
import { MashStepListItem } from "../MashProfileForm/MashStepListItem";
import { Section } from "@/components/Section";

export type MashProfileDisplayProps = {
  src?: ExtendedMashProfile | null;
};
const makeActions: (mashProfile: ExtendedMashProfile) => AppBarAction[] = (
  mashProfile,
) => [{ text: "Edit", url: `/profiles/mash/${mashProfile.slug}/edit` }];

export function MashProfileDisplay({ src }: MashProfileDisplayProps) {
  return (
    <AppBarLayout
      title={`MashProfile: ${src?.name}`}
      actions={makeActions(src!)}
    >
      <div className="pt-4">
        <Section className="m-4  ">
          <div className="p-0 *:border-b-2 last-of-type:*:border-b-0">
            <Prop label="Name" value={src?.name} />
            <Prop label="Description" value={src?.description} />
          </div>
        </Section>
        <Section
          title="Steps"
          className="m-4 *:border-b-2 last-of-type:*:border-b-0 "
        >
          <ol className="p-0 *:border-b-2 last-of-type:*:border-b-0">
            {(src?.steps ?? []).map((step, index) => (
              <MashStepListItem key={step.id} src={step} index={index} />
            ))}
          </ol>
        </Section>
      </div>
      ;
    </AppBarLayout>
  );
}

export default MashProfileDisplay;
