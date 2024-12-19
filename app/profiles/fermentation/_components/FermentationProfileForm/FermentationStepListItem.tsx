import { FermentationStep } from "@prisma/client";
import React from "react";
import { ExtendedFermentationStep } from "@/types/Profile";
import Link from "next/link";
import { Button } from "@/components/ui/button";
type FermentationStepTextProps = {
  src: FermentationStep;
};
export function FermentationStepText({ src }: FermentationStepTextProps) {
  return (
    <span className="capitalize">
      {src.type} - {src.name} - {src.time} min @ {src.temperature}
    </span>
  );
}

export type FermentationStepListItemProps = {
  src: ExtendedFermentationStep | FermentationStep;
  index: number;
};
export function FermentationStepListItem({
  src,
  index,
}: FermentationStepListItemProps) {
  const title = src.name ? `${src.name} (${src.type})` : src.type;
  return (
    <div className="flex-grow h-full grid grid-cols-3 text-center *:my-auto">
      <span className="capitalize">{title}</span>
      <span>
        {src.time} days (Ramp: {src.rampTime} days)
      </span>
      <span>{src.temperature} F</span>
    </div>
  );
}
