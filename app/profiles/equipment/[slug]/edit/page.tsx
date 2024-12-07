import { EquipmentProfileForm } from "@/app/profiles/equipment/_components/EquipmentProfileForm";
import { getEquipmentProfile } from "@/app/profiles/equipment/queries";
import { updateEquipmentProfile } from "../../actions";
type EquipmentProfileEditorPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: EquipmentProfileEditorPageProps) {
  const { slug } = await params;
  return {
    title: `LNK EquipmentProfile: ${slug}`,
  };
}

export default async function EquipmentProfileEditorPage({
  params,
}: EquipmentProfileEditorPageProps) {
  const { slug } = await params;
  const equipmentProfile = await getEquipmentProfile(slug);
  return (
    <EquipmentProfileForm
      src={equipmentProfile}
      action={updateEquipmentProfile}
    />
  );
}
