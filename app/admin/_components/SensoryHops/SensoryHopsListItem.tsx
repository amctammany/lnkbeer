import { ListItem } from "@/components/List/ListItem";
import { ListItemIcon } from "@/components/List/ListItemIcon";
import { ListItemText } from "@/components/List/ListItemText";
import { Hop as HopType } from "@prisma/client";
import { Hop } from "lucide-react";

export type SensoryHopsListItemProps = {
  hop: HopType;
  active?: boolean;
};
export const SensoryHopsListItem = ({
  hop,
  active = false,
}: SensoryHopsListItemProps) => {
  return (
    <ListItem
      border="none"
      className="even:bg-slate-100 odd:bg-slate-200"
      href={`/admin/sensory/hops/${hop.slug}`}
    >
      <ListItemIcon variant="icon">
        <Hop />
      </ListItemIcon>
      <ListItemText className="grow" primary={hop.id} secondary={hop.country} />
    </ListItem>
  );
};

export default SensoryHopsListItem;
