import {
  FermentationProfileForm,
  FermentationStepForm,
} from "@/app/profiles/fermentation/_components/FermentationProfileForm";
import {
  getFermentationProfile,
  getFermentationStep,
} from "@/app/profiles/fermentation/queries";
import {
  createFermentationStep,
  updateFermentationProfile,
  updateFermentationStep,
} from "@/app/profiles/fermentation/actions";
import clsx from "clsx";
import {
  ExtendedFermentationProfile,
  ExtendedFermentationStep,
  FermentationStepInput,
} from "@/types/Profile";
import { FermentationProfile } from "@prisma/client";
type FermentationStepEditorPageProps = {
  params: Promise<{
    slug: string;
    id?: string[];
  }>;
};

export async function generateMetadata({
  params,
}: FermentationStepEditorPageProps) {
  const { slug, id } = await params;
  return {
    title: `LNK FermentationProfile: ${slug} - ${id} `,
  };
}

export default async function FermentationStepEditorPage({
  params,
}: FermentationStepEditorPageProps) {
  const { slug, id } = await params;
  const fermentationProfile = await getFermentationProfile(slug);
  const fermentationStep =
    id?.[0] !== undefined
      ? id?.[0] === "new"
        ? ({
            FermentationProfile: {
              slug: fermentationProfile.slug,
              name: fermentationProfile.name,
              id: fermentationProfile.id,
            },
            fermentationProfileId: fermentationProfile.id,
            rank: fermentationProfile.steps.length,
          } as ExtendedFermentationStep)
        : await getFermentationStep(id?.[0])
      : undefined;
  console.log({ id, fermentationProfile, fermentationStep });
  return (
    <>
      <FermentationProfileForm
        src={fermentationProfile}
        action={updateFermentationProfile}
      />
      <FermentationStepForm
        className={clsx("", {
          hidden: id === undefined || id?.[0] === undefined,
        })}
        src={fermentationStep! as FermentationStepInput}
        action={
          (fermentationStep?.id
            ? updateFermentationStep
            : createFermentationStep) as any
        }
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
