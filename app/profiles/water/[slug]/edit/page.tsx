import { WaterProfileForm } from "@/app/profiles/water/_components/WaterProfileForm";
import { getWaterProfile } from "@/app/profiles/water/queries";
import { updateWaterProfile } from "../../actions";
type WaterProfileEditorPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: WaterProfileEditorPageProps) {
  const { slug } = await params;
  return {
    title: `LNK WaterProfile: ${slug}`,
  };
}

export default async function WaterProfileEditorPage({
  params,
}: WaterProfileEditorPageProps) {
  const { slug } = await params;
  const waterProfile = await getWaterProfile(slug);
  return <WaterProfileForm src={waterProfile} action={updateWaterProfile} />;
}
