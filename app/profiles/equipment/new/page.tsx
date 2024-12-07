import { EquipmentProfileForm } from "@/app/profiles/equipment/_components/EquipmentProfileForm";
import { getEquipmentProfile } from "@/app/profiles/equipment/queries";
import { updateEquipmentProfile } from "@/app/profiles/equipment/actions";
type EquipmentProfileCreatorPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: EquipmentProfileCreatorPageProps) {
  const { slug } = await params;
  return {
    title: `LNK EquipmentProfile: ${slug}`,
  };
}

export default async function EquipmentProfileCreatorPage({
  params,
}: EquipmentProfileCreatorPageProps) {
  const { slug } = await params;
  const equipmentProfile = await getEquipmentProfile(slug);
  return <EquipmentProfileForm src={equipmentProfile} action={updateEquipmentProfile} />;
}
