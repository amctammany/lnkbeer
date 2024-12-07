import { getEquipmentProfiles } from "@/app/profiles/equipment/queries";
import EquipmentProfilesTable from "./_components/EquipmentProfilesTable/EquipmentProfilesTable";
export const metadata = {
  title: "LNK: EquipmentProfiles",
};

export default async function EquipmentProfilesListPage() {
  const equipmentProfiles = await getEquipmentProfiles();
  return <EquipmentProfilesTable equipmentProfiles={equipmentProfiles} />;
}
