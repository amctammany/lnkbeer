import { HopDisplay } from "@/app/ingredients/hops/_components/HopDisplay";
import { getHop } from "@/app/ingredients/hops/queries";
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

export default async function HopDisplayPage({ params }: HopDisplayPageProps) {
  const { slug } = await params;
  const hop = await getHop(slug);
  return <HopDisplay hop={hop} />;
}
