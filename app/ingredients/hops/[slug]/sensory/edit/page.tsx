import { HopSensoryEditor } from "@/app/ingredients/hops/_components/HopSensoryEditor";
import { getHop, getHops } from "@/app/ingredients/hops/queries";
import { AppBarLayout } from "@/components/AppBarLayout";
import AppBarTitle from "@/components/AppBarTitle";
import { Hop } from "lucide-react";
import { HopSensoryEditorActions } from "@/app/ingredients/hops/_components/HopSensoryEditor/HopSensoryEditorActions";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/client";
import { auth } from "@/app/auth";
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
export async function generateStaticParams() {
  const hops = await getHops();

  return hops.map((hop) => ({
    slug: hop.slug,
  }));
}
export default async function HopSensoryEditorPage({
  params,
}: HopSensoryEditorPageProps) {
  const { slug } = await params;
  const hop = await getHop(slug);
  const session = await auth();

  if (!session || !session?.user?.email) return redirect("/");
  const hopNote =
    (await prisma.hopNote.findFirst({
      where: { userEmail: session?.user?.email, hopId: hop?.id },
      include: { hop: true, sensoryPanel: { include: { aromas: true } } },
    })) ||
    ({
      userEmail: session?.user?.email,
      hopId: hop?.id,
      hop: { slug: hop?.slug },
    } as any);
  const aromas = await prisma.characteristicAroma.findMany();

  return (
    <Suspense fallback={<div>loading?</div>}>
      <HopSensoryEditor src={hop} hopNote={hopNote} aromas={aromas} />;
    </Suspense>
  );
}
