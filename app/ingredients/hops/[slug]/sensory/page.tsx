//import { HopSensory } from "@/app/ingredients/hops/_components/HopSensory";
import dynamic from "next/dynamic";
const HopSensory = dynamic(
  () => import("../../_components/HopSensory/HopSensory"),
);

import { getHop } from "@/app/ingredients/hops/queries";
import { AppBarLayout } from "@/components/AppBarLayout";
import AppBarTitle from "@/components/AppBarTitle";
import { Hop } from "lucide-react";
import { HopSensoryActions } from "@/app/ingredients/hops/_components/HopSensory/HopSensoryActions";
import { Suspense } from "react";
import { auth } from "@/app/auth";
import { notFound } from "next/navigation";
interface HopSensoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}
export async function generateMetadata({ params }: HopSensoryPageProps) {
  const { slug } = await params;
  return {
    title: `LNK HopSensory: ${slug}`,
  };
}
//export async function generateStaticParams() {
//const hops = await getHops();

//return hops.map((hop) => ({
//slug: hop.slug,
//}));
//}
export default async function HopSensoryPage({ params }: HopSensoryPageProps) {
  const { slug } = await params;
  const hop = await getHop(slug);
  const session = await auth();
  const user = session?.user;
  if (!hop) notFound();
  const expertPanels = hop.hopSensoryPanels.filter(
    (panel) => panel.userId === "ADMIN",
  );
  const userPanels = hop.hopSensoryPanels.filter(
    (panel) => user && panel.userId === user.id,
  );
  return (
    <AppBarLayout
      title={<AppBarTitle icon={<Hop />}>{slug}</AppBarTitle>}
      actions={<HopSensoryActions slug={slug} />}
    >
      <Suspense fallback={<div>loading?</div>}>
        <HopSensory
          hop={hop}
          userPanels={userPanels}
          expertPanels={expertPanels}
        />
      </Suspense>
    </AppBarLayout>
  );
}
