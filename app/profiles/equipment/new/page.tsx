import { EquipmentProfileForm } from "@/app/profiles/equipment/_components/EquipmentProfileForm";
//import { getEquipmentProfile } from "@/app/profiles/equipment/queries";
import {
  createEquipmentProfile,
  //updateEquipmentProfile,
} from "@/app/profiles/equipment/actions";
//import { prisma } from "@/lib/client";
import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import { EquipmentProfileInput } from "@/types/Profile";
//import slugify from "@/lib/slugify";
type EquipmentProfileCreatorPageProps = any;

export async function generateMetadata({}: EquipmentProfileCreatorPageProps) {
  return {
    title: `LNK EquipmentProfile Creator`,
  };
}

export default async function EquipmentProfileCreatorPage({}: EquipmentProfileCreatorPageProps) {
  const session = await auth();
  if (!session?.user)
    return redirect("/admin/login?callbackUrl=/profiles/equipment/new");
  //const user = await prisma.user.findFirst({
  //where: { id: session?.user?.id },
  //include: {
  //equipmentProfiles: { select: { id: true, name: true } },
  //},
  //});
  //if (!user) throw new Error("Invalid User?");
  //const name = `${user?.name} - EquipmentProfile ${user?.equipmentProfiles.length + 1}`;

  const src = {
    //name,
    //slug: slugify(name, { lower: true }),
    userId: session.user.id,
  } as EquipmentProfileInput;
  return <EquipmentProfileForm src={src} action={createEquipmentProfile} />;
  /**
  const res = await prisma.equipmentProfile.create({
    data: {
      name,
      slug: slugify(name, { lower: true }),
      userId: user.id,
    },
  });
  redirect(`/profiles/equipment/${res.slug}/edit`);
  */
}
