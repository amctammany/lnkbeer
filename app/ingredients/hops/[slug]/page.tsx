import { HopDisplay } from "@/app/ingredients/hops/_components/HopDisplay";
import { getHop, getHops } from "@/app/ingredients/hops/queries";
import { AppBarLayout } from "@/components/AppBarLayout";
import AppBarTitle from "@/components/AppBarTitle";
import { Hop } from "lucide-react";
import { HopDisplayActions } from "@/app/ingredients/hops/_components/HopDisplay/HopDisplayActions";
import { Suspense } from "react";
const SummaryTab = dynamic(
  () => import("../_components/HopDisplay/SummaryTab")
);
const CompositionTab = dynamic(
  () => import("../_components/HopDisplay/CompositionTab")
);

import { notFound } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import dynamic from "next/dynamic";
import SensoryTab from "../_components/HopDisplay/SensoryTab";
interface HopDisplayPageProps {
  params: Promise<{
    slug: string;
  }>;
}
export async function generateMetadata({ params }: HopDisplayPageProps) {
  const { slug } = await params;
  return {
    title: `LNK Hop: ${slug}`,
  };
}
export async function generateStaticParams() {
  const hops = await getHops();

  return hops.map((hop) => ({
    slug: hop.slug,
  }));
}
export default async function HopDisplayPage({ params }: HopDisplayPageProps) {
  const { slug } = await params;
  const hop = await getHop(slug);
  if (!hop) notFound();
  return (
    <AppBarLayout
      title={<AppBarTitle icon={<Hop />}>{hop?.name}</AppBarTitle>}
      actions={<HopDisplayActions slug={hop.slug} />}
    >
      <Tabs defaultValue="summary">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="composition">Composition</TabsTrigger>
          <TabsTrigger value="sensory">Sensory</TabsTrigger>
        </TabsList>
        <TabsContent value="summary">
          <SummaryTab src={hop} />
        </TabsContent>
        <TabsContent value="composition">
          <CompositionTab src={hop} />
        </TabsContent>

        <TabsContent value="sensory">
          <SensoryTab src={hop} />
        </TabsContent>
      </Tabs>
    </AppBarLayout>
  );
  //return <HopDisplay hop={hop} />;
}
