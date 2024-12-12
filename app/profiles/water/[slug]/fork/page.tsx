import { auth } from "@/app/auth";
import { WaterProfileForm } from "../../_components/WaterProfileForm";
import { updateWaterProfile } from "../../actions";
import { getWaterProfile } from "../../queries";
import slugify from "slugify";
import { prisma } from "@/lib/client";

export type WaterProfileForkPageProps = {
  params: Promise<{ slug: string }>;
};
export default async function WaterProfileForkPage({
  params,
}: WaterProfileForkPageProps) {
  const { slug } = await params;
  const session = await auth();
  if (!session?.user.id) {
    throw new Error("Unauthorized User");
  }
  const { id, owner, origin, forks, ...old } = await getWaterProfile(slug);
  const count = await prisma.waterProfile.count({
    where: { userId: session.user.id, forkedFrom: id },
  });
  const name = `${session.user.name} - ${old.name} (${count})`;

  const fork = await prisma.waterProfile.create({
    data: {
      ...old,
      name,
      slug: slugify(name, { lower: true }),
      forkedFrom: id,
      userId: session.user.id,
    },
  });
  return <WaterProfileForm src={fork} action={updateWaterProfile} />;
}
