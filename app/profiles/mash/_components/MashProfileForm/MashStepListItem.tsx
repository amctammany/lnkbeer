import { MashStep } from "@prisma/client";
import React from "react";
import { ExtendedMashStep } from "@/types/Profile";
import Link from "next/link";
import { Button } from "@/components/ui/button";
type MashStepTextProps = {
  src: MashStep;
};
export function MashStepText({ src }: MashStepTextProps) {
  return (
    <span className="capitalize">
      {src.type} - {src.name} - {src.time} min @ {src.temperature}
    </span>
  );
}

export type MashStepListItemProps = {
  src: ExtendedMashStep | MashStep;
  index: number;
};
export function MashStepListItem({ src, index }: MashStepListItemProps) {
  return (
    <li className="list-item leading-4 py-2 px-1 hover:bg-slate-200 ">
      <div className="flex">
        <div className="flex-grow w-full grid grid-cols-3 text-center *:my-auto">
          <span>
            {src.type} - {src.name}
          </span>
          <span>
            {src.time} min (Ramp: {src.rampTime} min)
          </span>
          <span>{src.temperature} F</span>
        </div>
        <div className="text-right">
          <Button>X</Button>
        </div>
      </div>
    </li>
  );
}
