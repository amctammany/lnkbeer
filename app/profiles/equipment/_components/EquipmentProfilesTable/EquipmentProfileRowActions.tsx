import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CellContext } from "@tanstack/react-table";
import { MoreHorizontal, Link } from "lucide-react";
import slugify from "slugify";
import { removeEquipmentProfile } from "@/app/profiles/equipment/actions";
import { RemoveButton } from "@/components/RemoveButton";

export function EquipmentProfileRowActions<T>({
  row,
}: CellContext<T, unknown>) {
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
        <DropdownMenuItem>
          <RemoveButton
            name="slug"
            id={slugify(row.getValue("name"), { lower: true })}
            action={removeEquipmentProfile}
          />
        </DropdownMenuItem>
        <DropdownMenuItem>View payment details</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
