"use client";
import { EquipmentProfile } from "@prisma/client";
import { AppBarLayout } from "@/components/AppBarLayout";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Header } from "@/components/DataTable/Header";
import Link from "next/link";
import slugify from "slugify";
import EquipmentProfilesTableActions from "./EquipmentProfilesTableActions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
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
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link
                href={`/profiles/equipment/${slugify(row.getValue("name"), { lower: true })}/fork`}
              >
                Fork
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Remove</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
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
