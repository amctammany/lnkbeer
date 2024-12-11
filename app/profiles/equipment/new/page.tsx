import { EquipmentProfileForm } from "@/app/profiles/equipment/_components/EquipmentProfileForm";
import { getEquipmentProfile } from "@/app/profiles/equipment/queries";
import { updateEquipmentProfile } from "@/app/profiles/equipment/actions";
import { prisma } from "@/lib/client";
import { auth } from "@/app/auth";
import slugify from "slugify";
import { redirect } from "next/navigation";
type EquipmentProfileCreatorPageProps = any;

export async function generateMetadata({}: EquipmentProfileCreatorPageProps) {
  return {
    title: `LNK EquipmentProfile Creator`,
  };
}

export default async function EquipmentProfileCreatorPage({}: EquipmentProfileCreatorPageProps) {
  const session = await auth();
  if (!session?.user)
    return redirect("/admin/login?returnUrl=/profiles/mash/new");
  const user = await prisma.user.findFirst({
    where: { id: session?.user?.id },
    include: {
      equipmentProfiles: { select: { id: true, name: true } },
    },
  });
  if (!user) throw new Error("Invalid User?");
  const name = `${user?.name} - EquipmentProfile ${user?.equipmentProfiles.length}`;
  const res = await prisma.equipmentProfile.create({
    data: {
      name,
      slug: slugify(name, { lower: true }),
    },
  });
  redirect(`/profiles/mash/${res.slug}/edit`);
}
