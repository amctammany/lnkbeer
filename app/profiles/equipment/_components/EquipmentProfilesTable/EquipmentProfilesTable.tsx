"use client";
import { EquipmentProfile } from "@prisma/client";
import { AppBarLayout } from "@/components/AppBarLayout";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Header } from "@/components/DataTable/Header";
import Link from "next/link";
import slugify from "slugify";
import EquipmentProfilesTableActions from "./EquipmentProfilesTableActions";
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
];

export type EquipmentProfilesTableProps = {
  equipmentProfiles?: EquipmentProfile[];
};
export function EquipmentProfilesTable({
  equipmentProfiles = [],
}: EquipmentProfilesTableProps) {
  return (
    <AppBarLayout
      title="EquipmentProfiles List"
      actions={<EquipmentProfilesTableActions />}
    >
      <div className="relative overflow-auto">
        <DataTable data={equipmentProfiles} columns={columns} />
      </div>
    </AppBarLayout>
  );
}
export default EquipmentProfilesTable;
