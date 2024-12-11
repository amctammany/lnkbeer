import { WaterProfileForm } from "@/app/profiles/water/_components/WaterProfileForm";
import { getWaterProfile } from "@/app/profiles/water/queries";
import { updateWaterProfile } from "@/app/profiles/water/actions";
import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/client";
import slugify from "slugify";
type WaterProfileCreatorPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: WaterProfileCreatorPageProps) {
  const { slug } = await params;
  return {
    title: `LNK WaterProfile: ${slug}`,
  };
}

export default async function WaterProfileCreatorPage({}: WaterProfileCreatorPageProps) {
  const session = await auth();
  if (!session?.user)
    return redirect("/admin/login?returnUrl=/profiles/water/new");
  const user = await prisma.user.findFirst({
    where: { id: session?.user?.id },
    include: {
      waterProfiles: { select: { id: true, name: true } },
    },
  });
  if (!user) throw new Error("Invalid User?");
  const name = `${user?.name} - WaterProfile ${user?.waterProfiles.length}`;
  const res = await prisma.waterProfile.create({
    data: {
      name,
      slug: slugify(name, { lower: true }),
    },
  });
  redirect(`/profiles/water/${res.slug}/edit`);
}
