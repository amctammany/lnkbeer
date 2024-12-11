//import {
//MashProfileForm,
//MashStepForm,
//} from "@/app/profiles/mash/_components/MashProfileForm";
//import { createMashProfile, updateMashStep } from "@/app/profiles/mash/actions";
import { auth } from "@/app/auth";
import { prisma } from "@/lib/client";
//import { ExtendedMashProfile, ExtendedMashStep } from "@/types/Profile";
//import { MashStep } from "@prisma/client";
//import clsx from "clsx";
import { redirect } from "next/navigation";
import slugify from "slugify";
type MashProfileCreatorPageProps = any;

export async function generateMetadata() {
  return {
    title: "LNK Create MashProfile",
  };
}

export default async function MashProfileCreatorPage({}: MashProfileCreatorPageProps) {
  const session = await auth();
  if (!session?.user)
    return redirect("/admin/login?returnUrl=/profiles/mash/new");
  const user = await prisma.user.findFirst({
    where: { id: session?.user?.id },
    include: {
      mashProfiles: { select: { id: true, name: true } },
    },
  });
  if (!user) throw new Error("Invalid User?");
  const name = `${user?.name} - MashProfile ${user?.mashProfiles.length}`;
  const res = await prisma.mashProfile.create({
    data: {
      name,
      slug: slugify(name, { lower: true }),
    },
  });
  redirect(`/profiles/mash/${res.slug}/edit`);
  //const mashProfile = { steps: [] as MashStep[] } as ExtendedMashProfile;
  //return <MashProfileForm src={mashProfile} action={createMashProfile} />;
  //const { slug, } = await params;
  //const mashProfile = await getMashProfile(slug);
  //const mashStep =
  //id?.[0] !== undefined ? await getMashStep(id?.[0]) : undefined;
  /**
  return (
    <>
      <MashProfileForm src={mashProfile} action={createMashProfile} />
      <MashStepForm
        className={clsx("", {
          //hidden: id === undefined || id?.[0] === undefined,
        })}
        src={{} as ExtendedMashStep}
        action={updateMashStep as any}
      />
    </>
  );
   */
}
