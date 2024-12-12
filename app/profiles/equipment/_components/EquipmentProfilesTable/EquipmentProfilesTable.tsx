"use client";
import { EquipmentProfile } from "@prisma/client";
import { AppBarLayout } from "@/components/AppBarLayout";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Header } from "@/components/DataTable/Header";
import Link from "next/link";
import slugify from "slugify";
import { EquipmentProfilesTableActions } from "./EquipmentProfilesTableActions";
import { EquipmentProfileRowActions } from "./EquipmentProfileRowActions";
import { Anvil } from "lucide-react";
import AppBarTitle from "@/components/AppBarTitle";
const columns: ColumnDef<EquipmentProfile>[] = [
  {
    accessorKey: "name",
    header: Header<EquipmentProfile>,
    cell: ({ getValue }) => (
      <Link
        className="hover:underline"
        prefetch={false}
        href={`/profiles/equipment/${slugify(getValue<string>(), { lower: true })}`}
      >
        {getValue<string>()}
      </Link>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: EquipmentProfileRowActions<EquipmentProfile>,
  },
];

export type EquipmentProfilesTableProps = {
  equipmentProfiles?: EquipmentProfile[];
};
export function EquipmentProfilesTable({
  equipmentProfiles = [],
}: EquipmentProfilesTableProps) {
  return (
    <AppBarLayout
      title={<AppBarTitle icon={<Anvil />}>List</AppBarTitle>}
      actions={<EquipmentProfilesTableActions />}
    >
      <div className="relative overflow-auto">
        <DataTable data={equipmentProfiles} columns={columns} />
      </div>
    </AppBarLayout>
  );
}
export default EquipmentProfilesTable;
