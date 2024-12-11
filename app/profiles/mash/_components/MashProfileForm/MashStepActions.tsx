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
import {
  ArrowBigDown,
  ArrowBigUp,
  CopyPlus,
  Delete,
  Ellipsis,
} from "lucide-react";
import { ComponentProps } from "react";
import {
  duplicateMashStep,
  removeMashStep,
  shiftMashStep,
} from "@/app/profiles/mash/actions";

export type MashStepActionsProps = {
  src: ExtendedMashStep;
} & ComponentProps<"div">;
//import { duplicateMashStep } from "../../actions";
export function MashStepActions({ src, className }: MashStepActionsProps) {
  const handleClick = (action) => async (e) => {
    const res = await action(src);
    console.log(res);
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
          <DropdownMenuItem asChild>
            <Button variant="destructive" onClick={handleClick(removeMashStep)}>
              <Delete />
              <span>Destroy</span>
            </Button>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Button
              variant="ghost"
              onClick={handleClick(shiftMashStep.bind(null, -1))}
            >
              <ArrowBigUp />
              <span>Shift Up</span>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Button
              variant="ghost"
              onClick={handleClick(shiftMashStep.bind(null, 1))}
            >
              <ArrowBigDown />
              <span>Shift Down</span>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default MashStepActions;
