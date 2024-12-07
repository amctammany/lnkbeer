import { WaterProfileForm } from "@/app/profiles/water/_components/WaterProfileForm";
import { getWaterProfile } from "@/app/profiles/water/queries";
import { updateWaterProfile } from "@/app/profiles/water/actions";
type WaterProfileCreatorPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: WaterProfileCreatorPageProps) {
  const { slug } = await params;
  return {
    title: `LNK WaterProfile: ${slug}`,
  };
}

export default async function WaterProfileCreatorPage({
  params,
}: WaterProfileCreatorPageProps) {
  const { slug } = await params;
  const waterProfile = await getWaterProfile(slug);
  return <WaterProfileForm src={waterProfile} action={updateWaterProfile} />;
}
