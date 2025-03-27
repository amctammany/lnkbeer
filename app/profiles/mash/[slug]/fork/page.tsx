import { auth } from "@/app/auth";
import { MashProfileForm } from "../../_components/MashProfileForm";
import { updateMashProfile } from "../../actions";
import { getMashProfile } from "../../queries";
import slugify from "slugify";
import { prisma } from "@/lib/client";
import { ExtendedMashStep } from "@/types/Profile";

export type MashProfileForkPageProps = {
  params: Promise<{ slug: string }>;
};
export default async function MashProfileForkPage({
  params,
}: MashProfileForkPageProps) {
  const { slug } = await params;
  const session = await auth();
  if (!session?.user.id) {
    throw new Error("Unauthorized User");
  }
  // eslint-disable-next-line
  const { id, owner, origin, forks, steps, ...old } =
    await getMashProfile(slug);
  const count = await prisma.mashProfile.count({
    where: { userId: session.user.id, forkedFrom: id },
  });
  const name = `${session.user.name} - ${old.name} (${count})`;

  const fork = await prisma.mashProfile.create({
    data: {
      ...old,
      name,
      slug: slugify(name, { lower: true }),
      forkedFrom: id,
      userId: session.user.id,
      steps: {
        createMany: {
          data: (steps as ExtendedMashStep[]).map(
            // eslint-disable-next-line
            ({ id, MashProfile, mashProfileId, ...s }) => s
          ),
        },
      },
    },
    include: {
      steps: true,
      forks: { select: { id: true } },
    },
  });
  return <MashProfileForm src={fork} action={updateMashProfile} />;
}
