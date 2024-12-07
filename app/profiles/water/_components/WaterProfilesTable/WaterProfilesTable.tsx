"use client";
import { WaterProfile } from "@prisma/client";
import { AppBarLayout } from "@/components/AppBarLayout";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Header } from "@/components/DataTable/Header";
import Link from "next/link";
import slugify from "slugify";
import { Plus } from "lucide-react";
const columns: ColumnDef<WaterProfile>[] = [
  {
    accessorKey: "name",
    header: Header<WaterProfile>,
    cell: ({ getValue }) => (
      <Link
        className="hover:underline"
        prefetch={false}
        href={`/profiles/water/${slugify(getValue<string>(), { lower: true })}`}
      >
        {getValue<string>()}
      </Link>
    ),
  },
];
export type WaterProfilesTableProps = {
  waterProfiles?: WaterProfile[];
};
export function WaterProfilesTable({
  waterProfiles = [],
}: WaterProfilesTableProps) {
  return (
    <AppBarLayout
      title="WaterProfiles List"
      actions={[{ text: "New", url: "/profiles/water/new", icon: Plus }]}
    >
      <div className="relative overflow-auto">
        <DataTable data={waterProfiles} columns={columns} />
      </div>
    </AppBarLayout>
  );
}
export default WaterProfilesTable;
