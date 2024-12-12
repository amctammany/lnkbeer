import { auth } from "@/app/auth";
import { EquipmentProfileForm } from "../../_components/EquipmentProfileForm";
import { updateEquipmentProfile } from "../../actions";
import { getEquipmentProfile } from "../../queries";
import slugify from "slugify";
import { prisma } from "@/lib/client";

export type EquipmentProfileForkPageProps = {
  params: Promise<{ slug: string }>;
};
export default async function EquipmentProfileForkPage({
  params,
}: EquipmentProfileForkPageProps) {
  const { slug } = await params;
  const session = await auth();
  if (!session?.user.id) {
    throw new Error("Unauthorized User");
  }
  const { id, owner, origin, forks, ...old } = await getEquipmentProfile(slug);
  const count = await prisma.equipmentProfile.count({
    where: { userId: session.user.id, forkedFrom: id },
  });
  const name = `${session.user.name} - ${old.name} (${count})`;

  const fork = await prisma.equipmentProfile.create({
    data: {
      ...old,
      name,
      slug: slugify(name, { lower: true }),
      forkedFrom: id,
      userId: session.user.id,
    },
  });
  return <EquipmentProfileForm src={fork} action={updateEquipmentProfile} />;
}
