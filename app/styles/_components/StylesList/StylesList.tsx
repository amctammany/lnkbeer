import type { Style } from "@prisma/client";
import { AppBarItem } from "@/components/AppBarItem";
import { BookType, Plus } from "lucide-react";
import { List } from "@/components/List/List";
import { StyleListItem } from "./StyleListItem";
import { AppBarLayout } from "@/components/AppBarLayout";
import AppBarTitle from "@/components/AppBarTitle";
export interface StylesListProps {
  styles: Style[];
}

const StylesListActions = () => {
  return [<AppBarItem key="new" url="/style/new" icon={<Plus />} text="New" />];
};

export function StylesList({ styles }: StylesListProps) {
  return (
    <AppBarLayout
      title={<AppBarTitle icon={<BookType />}>Styles</AppBarTitle>}
      actions={<StylesListActions />}
    >
      <List>
        {styles.map((style) => (
          <StyleListItem key={style.id} style={style} />
        ))}
      </List>
    </AppBarLayout>
  );
}

export default StylesList;
