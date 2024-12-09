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
  const title = src.name ? `${src.name} (${src.type})` : src.type;
  return (
    <div className="flex-grow h-full grid grid-cols-3 text-center *:my-auto">
      <span className="capitalize">{title}</span>
      <span>
        {src.time} min (Ramp: {src.rampTime} min)
      </span>
      <span>{src.temperature} F</span>
    </div>
  );
}
