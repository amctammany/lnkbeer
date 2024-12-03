import type { Style } from "@prisma/client";
import type { AppBarAction } from "@/components/AppBar";
import { Save } from "lucide-react";
import { List } from "@/components/List/List";
import { StyleListItem } from "./StyleListItem";
import { AppBarLayout } from "@/components/AppBarLayout";
export interface StylesListProps {
  styles: Style[];
}

const appbarItems: AppBarAction[] = [
  { text: "Save", icon: Save },
  { text: "foo" },
];

export function StylesList({ styles }: StylesListProps) {
  return (
    <AppBarLayout title="Styles List" actions={appbarItems}>
      <List>
        {styles.map((style) => (
          <StyleListItem key={style.id} style={style} />
        ))}
      </List>
    </AppBarLayout>
  );
}

export default StylesList;
