import { HopSensoryEditor } from "@/app/ingredients/hops/_components/HopSensoryEditor";
import { getHop, getHops } from "@/app/ingredients/hops/queries";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/client";
import { auth } from "@/app/auth";
import { ExtendedHopNote, HopNoteInput } from "@/types/ingredient";
import { HopNote } from "@prisma/client";
interface HopSensoryEditorPageProps {
  params: Promise<{
    slug: string;
  }>;
}
export async function generateMetadata({ params }: HopSensoryEditorPageProps) {
  const { slug } = await params;
  return {
    title: `LNK HopSensoryEditor: ${slug}`,
  };
}
export default async function HopSensoryEditorPage({
  params,
}: HopSensoryEditorPageProps) {
  const { slug } = await params;
  const hop = await getHop(slug);
  const session = await auth();

  if (!session || !session?.user?.email) return redirect("/");
  const hopNote: ExtendedHopNote = (await prisma.hopNote.findFirst({
    where: { userEmail: session?.user?.email, hopId: hop?.id },
    include: { hop: true, sensoryPanel: { include: { aromas: true } } },
  })) || {
    userEmail: session?.user?.email,
    userId: session?.user?.id,
    hopId: hop?.id,
    hop: { slug: hop?.slug },
  };
  const aromas = await prisma.characteristicAroma.findMany();

  return (
    <Suspense fallback={<div>loading?</div>}>
      <HopSensoryEditor src={hop} hopNote={hopNote} aromas={aromas} />
    </Suspense>
  );
}
