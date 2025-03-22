import { FermentationStep } from "@prisma/client";
import React from "react";
import { ExtendedFermentationStep } from "@/types/Profile";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { ListItem } from "@/components/List/ListItem";
import { ListItemIcon } from "@/components/List/ListItemIcon";
import { ListItemText } from "@/components/List/ListItemText";
import { Clock, Thermometer } from "lucide-react";
type FermentationStepTextProps = {
  src: FermentationStep;
};
export function FermentationStepText({ src }: FermentationStepTextProps) {
  const title = src.name ? `${src.name} (${src.type})` : src.type;

  return <span>{title}</span>;
}
function IconBadge({ icon, text }) {
  return (
    <div className="flex items-center place-content-center border rounded border-black">
      {icon}
      <span className="border-l-2 border-black px-3">{text}</span>
    </div>
  );
}

export type FermentationStepListItemProps = {
  src: ExtendedFermentationStep | FermentationStep;
  index: number;
  className?: string;
};
function FermentationStepDetails({
  src,
}: {
  src: ExtendedFermentationStep | FermentationStep;
}) {
  return (
    <div className="flex gap-2 ">
      <IconBadge
        icon={<Clock size={16} className="mx-2" />}
        text={`${src.time} min`}
      />
      <IconBadge
        icon={<Thermometer size={16} className="mx-2" />}
        text={`${src.temperature} ${String.fromCodePoint(0x000b0)}F`}
      />
    </div>
  );
}
export function FermentationStepListItem({
  src,
  index,
  className,
}: FermentationStepListItemProps) {
  const title = src.name ? `${src.name} (${src.type})` : src.type;
  const time = `${src.time} days (Ramp: ${src.rampTime} days)`;
  return (
    <ListItem>
      <ListItemIcon variant="icon">{index}</ListItemIcon>
      <ListItemText
        primary={<FermentationStepText src={src} />}
        secondary={<FermentationStepDetails src={src} />}
      />
    </ListItem>
  );
}
/**
 *
    <li className={clsx("list-item text-center *:my-auto ", className)}>
      <div className="grid grid-rows-3">
        <span className="capitalize">{title}</span>
        <span>
          {src.time} days (Ramp: {src.rampTime} days)
        </span>
        <span>{src.temperature} F</span>
      </div>
    </li>
 */
