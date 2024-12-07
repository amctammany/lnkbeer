import {
  MashProfileForm,
  MashStepForm,
} from "@/app/profiles/mash/_components/MashProfileForm";
import { getMashProfile, getMashStep } from "@/app/profiles/mash/queries";
import { updateMashProfile, updateMashStep } from "@/app/profiles/mash/actions";
import clsx from "clsx";
import { MashStepInput } from "@/types/Profile";
type MashStepEditorPageProps = {
  params: Promise<{
    slug: string;
    id?: string[];
  }>;
};

export async function generateMetadata({ params }: MashStepEditorPageProps) {
  const { slug, id } = await params;
  return {
    title: `LNK MashProfile: ${slug} - ${id} `,
  };
}

export default async function MashStepEditorPage({
  params,
}: MashStepEditorPageProps) {
  const { slug, id } = await params;
  const mashProfile = await getMashProfile(slug);
  const mashStep =
    id?.[0] !== undefined ? await getMashStep(parseInt(id?.[0])) : undefined;
  return (
    <>
      <MashProfileForm src={mashProfile} action={updateMashProfile} />
      <MashStepForm
        className={clsx("", { hidden: id?.[0] === undefined })}
        src={mashStep! as MashStepInput}
        action={updateMashStep as any}
      />
    </>
  );
}
/**
      <div className="fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
        <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
        </div>
      </div>
 */
