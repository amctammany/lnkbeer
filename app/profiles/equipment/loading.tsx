import { AppBarLayout } from "@/components/AppBarLayout";
import AppBarTitle from "@/components/AppBarTitle";
import { TableSkeleton } from "@/components/DataTable/TableSkeleton";
import { EquipmentProfile } from "@prisma/client";
import { Anvil } from "lucide-react";

const headers: Capitalize<keyof EquipmentProfile>[] = [
  "Name",
  "BatchVolume",
  "BrewEfficiency",
];
export default function Loading() {
  return (
    <AppBarLayout title={<AppBarTitle icon={<Anvil />}>Profiles</AppBarTitle>}>
      <TableSkeleton headers={headers} />
    </AppBarLayout>
  );
}
