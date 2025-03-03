import { ListItem } from "@/components/List/ListItem";
import { ListItemIcon } from "@/components/List/ListItemIcon";
import { ListItemText } from "@/components/List/ListItemText";
import { Style } from "@prisma/client";

export type StyleListItemProps = {
  style: Style;
};
export const StyleListItem = ({ style }: StyleListItemProps) => {
  return (
    <ListItem
      border="none"
      className="even:bg-slate-100 odd:bg-slate-200"
      href={`/styles/${style.slug}`}
    >
      <ListItemIcon variant="icon">
        <div className="text-lg ">{style.identifier}</div>
      </ListItemIcon>
      <ListItemText
        className="grow"
        primary={style.name}
        secondary={style.category}
      />
    </ListItem>
  );
};
