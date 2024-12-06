import { FermentableDisplay } from "../_components/FermentableDisplay";
import { getFermentable } from "../queries";
type FermentableDisplayPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: FermentableDisplayPageProps) {
  const { slug } = await params;
  return {
    title: `LNK Fermentable: ${slug}`,
  };
}

export default async function FermentableDisplayPage({
  params,
}: FermentableDisplayPageProps) {
  const { slug } = await params;
  const fermentable = await getFermentable(slug);
  return <FermentableDisplay src={fermentable} />;
}
