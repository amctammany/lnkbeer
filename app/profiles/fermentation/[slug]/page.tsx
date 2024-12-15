import { AppBarLayout } from "@/components/AppBarLayout";
import { FermentationProfileDisplay } from "../_components/FermentationProfileDisplay";
import { getFermentationProfile } from "../queries";
import AppBarTitle from "@/components/AppBarTitle";
import { Anvil } from "lucide-react";
import FermentationProfileDisplayActions from "../_components/FermentationProfileDisplay/FermentationProfileDisplayActions";
type FermentationProfileDisplayPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: FermentationProfileDisplayPageProps) {
  const { slug } = await params;
  return {
    title: `LNK FermentationProfile: ${slug}`,
  };
}

export default async function FermentationProfileDisplayPage({
  params,
}: FermentationProfileDisplayPageProps) {
  const { slug } = await params;
  const fermentationProfile = await getFermentationProfile(slug);
  return (
    <AppBarLayout
      title={
        <AppBarTitle icon={<Anvil />}>{fermentationProfile?.name}</AppBarTitle>
      }
      actions={<FermentationProfileDisplayActions src={fermentationProfile} />}
    >
      <FermentationProfileDisplay src={fermentationProfile} />
    </AppBarLayout>
  );
}
