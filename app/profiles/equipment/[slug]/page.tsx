import { EquipmentProfileDisplay } from "../_components/EquipmentProfileDisplay";
import { getEquipmentProfile } from "../queries";
type EquipmentProfileDisplayPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: EquipmentProfileDisplayPageProps) {
  const { slug } = await params;
  return {
    title: `LNK EquipmentProfile: ${slug}`,
  };
}

export default async function EquipmentProfileDisplayPage({
  params,
}: EquipmentProfileDisplayPageProps) {
  const { slug } = await params;
  const equipmentProfile = await getEquipmentProfile(slug);
  return <EquipmentProfileDisplay src={equipmentProfile} />;
}
