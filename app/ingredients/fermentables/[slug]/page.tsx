import { AppBarLayout } from "@/components/AppBarLayout";
import { FermentableDisplay } from "../_components/FermentableDisplay";
import { getFermentable } from "../queries";
import { FermentableDisplayActions } from "../_components/FermentableDisplay/FermentableDisplayActions";
import AppBarTitle from "@/components/AppBarTitle";
import { Wheat } from "lucide-react";
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
  return (
    <AppBarLayout
      title={<AppBarTitle icon={<Wheat />}>{fermentable?.name}</AppBarTitle>}
      actions={<FermentableDisplayActions slug={slug} />}
    >
      <FermentableDisplay src={fermentable} />
    </AppBarLayout>
  );
}
