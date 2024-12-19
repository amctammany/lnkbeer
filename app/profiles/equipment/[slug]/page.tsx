import { AppBarLayout } from "@/components/AppBarLayout";
import AppBarTitle from "@/components/AppBarTitle";
import { Anvil } from "lucide-react";
import { EquipmentProfileDisplay } from "../_components/EquipmentProfileDisplay";
import EquipmentProfileDisplayActions from "../_components/EquipmentProfileDisplay/EquipmentProfileDisplayActions";
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
  return (
    <AppBarLayout
      title={
        <AppBarTitle icon={<Anvil />}>{equipmentProfile?.name}</AppBarTitle>
      }
      actions={<EquipmentProfileDisplayActions src={equipmentProfile} />}
    >
      <EquipmentProfileDisplay src={equipmentProfile} />
    </AppBarLayout>
  );
}
