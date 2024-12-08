import { MashStep } from "@prisma/client";
import React from "react";
import { ExtendedMashStep } from "@/types/Profile";
import Link from "next/link";
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
    <li className="list-item py-2 px-1 hover:bg-slate-200 ">
      <div className="grid grid-cols-3">
        <span>
          {src.type} - {src.name}
        </span>
        <span>
          {src.time} min (Ramp: {src.rampTime} min)
        </span>
        <span>{src.temperature} F</span>
      </div>
    </li>
  );
}
