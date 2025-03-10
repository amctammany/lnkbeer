import { HopDisplay } from "@/app/ingredients/hops/_components/HopDisplay";
import { getHop, getHops } from "@/app/ingredients/hops/queries";
import { AppBarLayout } from "@/components/AppBarLayout";
import AppBarTitle from "@/components/AppBarTitle";
import { Hop } from "lucide-react";
import { HopDisplayActions } from "@/app/ingredients/hops/_components/HopDisplay/HopDisplayActions";
import { Suspense } from "react";
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
  return (
    <AppBarLayout
      title={<AppBarTitle icon={<Hop />}>{hop?.name}</AppBarTitle>}
      actions={<HopDisplayActions slug={slug} />}
    >
      <Suspense fallback={<div>loading?</div>}>
        <HopDisplay hop={hop} />
      </Suspense>
    </AppBarLayout>
  );
}
