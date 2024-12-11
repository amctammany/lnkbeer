import type { Style } from "@prisma/client";
import { AppBarAction, type AppBarActionProps } from "@/components/AppBar";
import { Plus, Save } from "lucide-react";
import { List } from "@/components/List/List";
import { StyleListItem } from "./StyleListItem";
import { AppBarLayout } from "@/components/AppBarLayout";
export interface StylesListProps {
  styles: Style[];
}

const StylesListActions = () => {
  return [
    <AppBarAction key="new" url="/style/new" icon={<Plus />} text="New" />,
  ];
};

export function StylesList({ styles }: StylesListProps) {
  return (
    <AppBarLayout title="Styles List" actions={<StylesListActions />}>
      <List>
        {styles.map((style) => (
          <StyleListItem key={style.id} style={style} />
        ))}
      </List>
    </AppBarLayout>
  );
}

export default StylesList;
