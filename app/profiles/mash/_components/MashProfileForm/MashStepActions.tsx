import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ExtendedMashStep } from "@/types/Profile";
import {
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ArrowBigDown, ArrowBigUp, CopyPlus, Ellipsis } from "lucide-react";
import { ComponentProps } from "react";

export type MashStepActionsProps = {
  src: ExtendedMashStep;
} & ComponentProps<"div">;
export function MashStepActions({ src, className }: MashStepActionsProps) {
  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline">
            <Ellipsis className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>
            <CopyPlus />
            <span>Duplicate</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ArrowBigUp />
            <span>Shift Up</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ArrowBigDown />
            <span>Shift Down</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default MashStepActions;
