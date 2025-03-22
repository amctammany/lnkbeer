import { MashStep } from "@prisma/client";
import { ExtendedMashStep } from "@/types/Profile";
import { ListItem, ListItemProps } from "@/components/List/ListItem";
import { ListItemIcon } from "@/components/List/ListItemIcon";
import { ListItemText } from "@/components/List/ListItemText";
import { Clock, Thermometer } from "lucide-react";
import IconBadge from "@/components/IconBadge";
import { ListItemActions } from "@/components/List/ListItemActions";
type MashStepTextProps = {
  src: MashStep;
};
export function MashStepText({ src }: MashStepTextProps) {
  const title = src.name ? `${src.name} (${src.type})` : src.type;

  return <span>{title}</span>;
}
export type MashStepListItemProps = ListItemProps & {
  src: ExtendedMashStep | MashStep;
  index: number;
  //href?: string;
  //className?: string;
};
function MashStepDetails({ src }: { src: ExtendedMashStep | MashStep }) {
  return (
    <div className="flex gap-2 px-2 ">
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
export function MashStepListItem({
  src,
  index,
  href,
  children,
  className,
}: MashStepListItemProps) {
  return (
    <ListItem href={href} className={className}>
      <ListItemIcon variant="icon">{index}</ListItemIcon>
      <ListItemText
        primary={<MashStepText src={src} />}
        secondary={<MashStepDetails src={src} />}
      />
      <ListItemActions className={children ? "" : "hidden"}>
        {children}
      </ListItemActions>
    </ListItem>
  );
}
