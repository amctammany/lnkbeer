"use client";
import { MashProfile } from "@prisma/client";
import { AppBarLayout } from "@/components/AppBarLayout";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Header } from "@/components/DataTable/Header";
import Link from "next/link";
import slugify from "slugify";
import { Plus } from "lucide-react";
const columns: ColumnDef<MashProfile>[] = [
  {
    accessorKey: "name",
    header: Header<MashProfile>,
    cell: ({ getValue }) => (
      <Link
        className="hover:underline"
        prefetch={false}
        href={`/profiles/mash/${slugify(getValue<string>(), { lower: true })}`}
      >
        {getValue<string>()}
      </Link>
    ),
  },
];
export type MashProfilesTableProps = {
  mashProfiles?: MashProfile[];
};
export function MashProfilesTable({
  mashProfiles = [],
}: MashProfilesTableProps) {
  return (
    <AppBarLayout
      title="MashProfiles List"
      actions={[{ text: "New", url: "/profiles/mash/new", icon: Plus }]}
    >
      <div className="relative overflow-auto">
        <DataTable data={mashProfiles} columns={columns} />
      </div>
    </AppBarLayout>
  );
}
export default MashProfilesTable;
