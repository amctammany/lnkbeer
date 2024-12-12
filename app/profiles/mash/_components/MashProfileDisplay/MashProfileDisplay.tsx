import { Prop } from "@/components/Prop";
import { AppBarItem, AppBarItemProps } from "@/components/AppBarItem";
import { AppBarLayout } from "@/components/AppBarLayout";
import { ExtendedMashProfile } from "@/types/Profile";
import { MashStepListItem } from "../MashProfileForm/MashStepListItem";
import { Section } from "@/components/Section";

export type MashProfileDisplayProps = {
  src?: ExtendedMashProfile | null;
};
const MashProfileDisplayActions = ({
  src,
}: {
  src?: ExtendedMashProfile | null;
}) => {
  return [
    <AppBarItem
      key="edit"
      text="Edit"
      url={`/profiles/mash/${src?.slug}/edit`}
    />,
    <AppBarItem
      key="fork"
      text="Fork"
      url={`/profiles/mash/${src?.slug}/fork`}
    />,
  ];
};

export function MashProfileDisplay({ src }: MashProfileDisplayProps) {
  return (
    <AppBarLayout
      title={`MashProfile: ${src?.name}`}
      actions={<MashProfileDisplayActions src={src} />}
    >
      <div className="gap-2 lg:w-9/12 mx-auto">
        <Section title="General" className="m-4  ">
          <div className="p-0 *:border-b-2 last-of-type:*:border-b-0">
            <Prop label="Name" value={src?.name} />
            <Prop label="Description" value={src?.description} />
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
