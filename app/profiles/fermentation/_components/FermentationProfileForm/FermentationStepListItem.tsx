import { FermentationStep } from "@prisma/client";
import { ExtendedFermentationStep } from "@/types/Profile";
import { ListItem, ListItemProps } from "@/components/List/ListItem";
import { ListItemIcon } from "@/components/List/ListItemIcon";
import { ListItemText } from "@/components/List/ListItemText";
import { Clock, Thermometer, TriangleRight } from "lucide-react";
import IconBadge from "@/components/IconBadge";
import { ListItemActions } from "@/components/List/ListItemActions";
type FermentationStepTextProps = {
  src: FermentationStep;
};
export function FermentationStepText({ src }: FermentationStepTextProps) {
  const title = src.name ? `${src.name} (${src.type})` : src.type;

  return <span className="capitalize">{title}</span>;
}
export type FermentationStepListItemProps = ListItemProps & {
  src: ExtendedFermentationStep | FermentationStep;
  index: number;
};
function FermentationStepDetails({
  src,
}: {
  src: ExtendedFermentationStep | FermentationStep;
}) {
  return (
    <div className="flex gap-2 px-2 ">
      <IconBadge
        icon={<Clock size={16} className="mx-2" />}
        label="Time"
        text={`${src.time} m`}
      />
      <IconBadge
        icon={<Thermometer size={16} className="mx-2" />}
        label="Temperature"
        text={`${src.temperature} ${String.fromCodePoint(0x000b0)}F`}
      />
      <IconBadge
        className={src.rampTime ? "" : "hidden"}
        label="Ramp Time"
        icon={<TriangleRight size={16} className="mx-2" />}
        text={`${src.rampTime} m`}
      />
    </div>
  );
}
export function FermentationStepListItem({
  src,
  href,
  children,
  index,
  className,
}: FermentationStepListItemProps) {
  return (
    <ListItem href={href} className={className}>
      <ListItemIcon className="font-bold pr-2">{index}</ListItemIcon>
      <ListItemText
        primary={<FermentationStepText src={src} />}
        secondary={<FermentationStepDetails src={src} />}
      />
      <ListItemActions className={children ? "" : "hidden"}>
        {children}
      </ListItemActions>
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
