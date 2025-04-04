"use client";
import { FermentationProfile } from "@prisma/client";
//import { AppBarLayout } from "@/components/AppBarLayout";
//import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Header } from "@/components/DataTable/Header";
import Link from "next/link";
import slugify from "slugify";
import { FermentationProfileRowActions } from "./FermentationProfileRowActions";
import { DataTable } from "@/components/DataTable";
const columns: ColumnDef<FermentationProfile>[] = [
  {
    accessorKey: "name",
    header: Header<FermentationProfile>,
    cell: ({ getValue }) => (
      <Link
        className="hover:underline"
        prefetch={false}
        href={`/profiles/fermentation/${slugify(getValue<string>(), { lower: true })}`}
      >
        {getValue<string>()}
      </Link>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: FermentationProfileRowActions<FermentationProfile>,
  },
];
export type FermentationProfilesTableProps = {
  src?: FermentationProfile[];
};
export function FermentationProfilesTable({
  src = [],
}: FermentationProfilesTableProps) {
  return (
    <div className="relative overflow-auto">
      <DataTable data={src} columns={columns} />
    </div>
  );
}
export default FermentationProfilesTable;
