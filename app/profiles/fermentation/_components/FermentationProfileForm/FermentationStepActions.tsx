import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ExtendedFermentationStep } from "@/types/Profile";
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
  duplicateFermentationStep,
  removeFermentationStep,
  shiftFermentationStep,
} from "@/app/profiles/fermentation/actions";

export type FermentationStepActionsProps = {
  src: ExtendedFermentationStep;
} & ComponentProps<"div">;
//import { duplicateFermentationStep } from "../../actions";
export function FermentationStepActions({
  src,
  className,
}: FermentationStepActionsProps) {
  const handleClick = (action) => async () => {
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
            <Button
              variant="ghost"
              onClick={handleClick(duplicateFermentationStep)}
            >
              <CopyPlus />
              <span>Duplicate</span>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Button
              variant="destructive"
              onClick={handleClick(removeFermentationStep)}
            >
              <Delete />
              <span>Destroy</span>
            </Button>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Button
              variant="ghost"
              onClick={handleClick(shiftFermentationStep.bind(null, -1))}
            >
              <ArrowBigUp />
              <span>Shift Up</span>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Button
              variant="ghost"
              onClick={handleClick(shiftFermentationStep.bind(null, 1))}
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

export default FermentationStepActions;
