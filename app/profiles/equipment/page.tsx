import { getEquipmentProfiles } from "@/app/profiles/equipment/queries";
import EquipmentProfilesTable from "./_components/EquipmentProfilesTable/EquipmentProfilesTable";
import AppBarTitle from "@/components/AppBarTitle";
import { AppBarLayout } from "@/components/AppBarLayout";
import EquipmentProfilesTableActions from "./_components/EquipmentProfilesTable/EquipmentProfilesTableActions";
import { Anvil } from "lucide-react";
export const metadata = {
  title: "LNK: EquipmentProfiles",
};

export default async function EquipmentProfilesListPage() {
  const equipmentProfiles = await getEquipmentProfiles();
  return (
    <AppBarLayout
      title={<AppBarTitle icon={<Anvil />}>Equipment Profiles</AppBarTitle>}
      actions={<EquipmentProfilesTableActions />}
    >
      <EquipmentProfilesTable equipmentProfiles={equipmentProfiles} />
    </AppBarLayout>
  );
}
