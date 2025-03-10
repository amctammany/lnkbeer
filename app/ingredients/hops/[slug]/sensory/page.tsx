import { HopSensory } from "@/app/ingredients/hops/_components/HopSensory";
import { getHop, getHops } from "@/app/ingredients/hops/queries";
import { AppBarLayout } from "@/components/AppBarLayout";
import AppBarTitle from "@/components/AppBarTitle";
import { Hop } from "lucide-react";
import { HopSensoryActions } from "@/app/ingredients/hops/_components/HopSensory/HopSensoryActions";
import { Suspense } from "react";
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
export async function generateStaticParams() {
  const hops = await getHops();

  return hops.map((hop) => ({
    slug: hop.slug,
  }));
}
export default async function HopSensoryPage({ params }: HopSensoryPageProps) {
  const { slug } = await params;
  const hop = await getHop(slug);
  return (
    <AppBarLayout
      title={<AppBarTitle icon={<Hop />}>{slug}</AppBarTitle>}
      actions={<HopSensoryActions slug={slug} />}
    >
      <Suspense fallback={<div>loading?</div>}>
        <HopSensory hop={hop} />;
      </Suspense>
    </AppBarLayout>
  );
}
