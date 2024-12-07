import { YeastDisplay } from "../_components/YeastDisplay";
import { getYeast } from "../queries";
type YeastDisplayPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: YeastDisplayPageProps) {
  const { slug } = await params;
  return {
    title: `LNK Yeast: ${slug}`,
  };
}

export default async function YeastDisplayPage({
  params,
}: YeastDisplayPageProps) {
  const { slug } = await params;
  const yeast = await getYeast(slug);
  return <YeastDisplay src={yeast} />;
}
