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
    <li className="py-2 px-1 hover:bg-slate-200">
      <b className="px-2">{index}</b>
      <MashStepText src={src} />
      <b className="px-2">Ramp Time:</b>
      <span>{src.rampTime} min</span>
    </li>
  );
}
