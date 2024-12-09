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
import { duplicateMashStep } from "../../actions";

export type MashStepActionsProps = {
  src: ExtendedMashStep;
} & ComponentProps<"div">;
//import { duplicateMashStep } from "../../actions";
export function MashStepActions({ src, className }: MashStepActionsProps) {
  const handleClick = (action) => async (e) => {
    await action(src);
  };
  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline" asChild>
            <div>
              <Ellipsis className="text-black size-4" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <Button variant="ghost" onClick={handleClick(duplicateMashStep)}>
              <CopyPlus />
              <span>Duplicate</span>
            </Button>
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
