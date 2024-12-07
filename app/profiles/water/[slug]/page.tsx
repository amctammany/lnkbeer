import { WaterProfileDisplay } from "../_components/WaterProfileDisplay";
import { getWaterProfile } from "../queries";
type WaterProfileDisplayPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: WaterProfileDisplayPageProps) {
  const { slug } = await params;
  return {
    title: `LNK WaterProfile: ${slug}`,
  };
}

export default async function WaterProfileDisplayPage({
  params,
}: WaterProfileDisplayPageProps) {
  const { slug } = await params;
  const waterProfile = await getWaterProfile(slug);
  return <WaterProfileDisplay src={waterProfile} />;
}
