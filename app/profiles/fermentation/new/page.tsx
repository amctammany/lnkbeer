//import {
//FermentationProfileForm,
//FermentationStepForm,
//} from "@/app/profiles/fermentation/_components/FermentationProfileForm";
//import { createFermentationProfile, updateFermentationStep } from "@/app/profiles/fermentation/actions";
import { auth } from "@/app/auth";
import { prisma } from "@/lib/client";
//import { ExtendedFermentationProfile, ExtendedFermentationStep } from "@/types/Profile";
//import { FermentationStep } from "@prisma/client";
//import clsx from "clsx";
import { redirect } from "next/navigation";
import slugify from "slugify";
type FermentationProfileCreatorPageProps = any;

export async function generateMetadata() {
  return {
    title: "LNK Create FermentationProfile",
  };
}

export default async function FermentationProfileCreatorPage({}: FermentationProfileCreatorPageProps) {
  const session = await auth();
  if (!session?.user)
    return redirect("/admin/login?returnUrl=/profiles/fermentation/new");
  const user = await prisma.user.findFirst({
    where: { id: session?.user?.id },
    include: {
      fermentationProfiles: { select: { id: true, name: true } },
    },
  });
  if (!user) throw new Error("Invalid User?");
  const name = `${user?.name} - FermentationProfile ${user?.fermentationProfiles.length}`;
  const res = await prisma.fermentationProfile.create({
    data: {
      name,
      slug: slugify(name, { lower: true }),
      userId: user.id,
    },
  });
  redirect(`/profiles/fermentation/${res.slug}/edit`);
  //const fermentationProfile = { steps: [] as FermentationStep[] } as ExtendedFermentationProfile;
  //return <FermentationProfileForm src={fermentationProfile} action={createFermentationProfile} />;
  //const { slug, } = await params;
  //const fermentationProfile = await getFermentationProfile(slug);
  //const fermentationStep =
  //id?.[0] !== undefined ? await getFermentationStep(id?.[0]) : undefined;
  /**
  return (
    <>
      <FermentationProfileForm src={fermentationProfile} action={createFermentationProfile} />
      <FermentationStepForm
        className={clsx("", {
          //hidden: id === undefined || id?.[0] === undefined,
        })}
        src={{} as ExtendedFermentationStep}
        action={updateFermentationStep as any}
      />
    </>
  );
   */
}
