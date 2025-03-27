import { AppBarLayout } from "@/components/AppBarLayout";
import { FermentableDisplay } from "../_components/FermentableDisplay";
import { getFermentable, getFermentables } from "../queries";
import { FermentableDisplayActions } from "../_components/FermentableDisplay/FermentableDisplayActions";
import AppBarTitle from "@/components/AppBarTitle";
import { Wheat } from "lucide-react";
import { notFound } from "next/navigation";
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
export async function generateStaticParams() {
  const fermentables = await getFermentables();

  return fermentables.map(({ slug }) => ({
    slug,
  }));
}

export default async function FermentableDisplayPage({
  params,
}: FermentableDisplayPageProps) {
  const { slug } = await params;
  const fermentable = await getFermentable(slug);
  if (!fermentable) notFound();
  return (
    <AppBarLayout
      title={<AppBarTitle icon={<Wheat />}>{fermentable?.name}</AppBarTitle>}
      actions={<FermentableDisplayActions slug={slug} />}
    >
      <FermentableDisplay src={fermentable} />
    </AppBarLayout>
  );
}
