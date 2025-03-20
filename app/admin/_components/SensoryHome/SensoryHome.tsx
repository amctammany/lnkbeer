import { AppBarItem } from "@/components/AppBarItem";
import { Prop } from "@/components/Prop";
import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import { ExtendedUser } from "@/types/User";
import type { HopSensoryPanel, User } from "@prisma/client";
import { Hop, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

export interface SensoryHomeProps {
  user?: ExtendedUser | null;
  panels: Pick<HopSensoryPanel, "id" | "hopId" | "userId">[];
  //action?: any;
  //children: React.ReactNode;
}
import { ListItem } from "@/components/List/ListItem";
import { ListItemIcon } from "@/components/List/ListItemIcon";
import { ListItemText } from "@/components/List/ListItemText";
import { List } from "@/components/List/List";

export type HopSensoryListItemProps = {
  src: Pick<HopSensoryPanel, "id" | "hopId" | "userId">;
};
export const HopSensoryListItem = ({ src }: HopSensoryListItemProps) => {
  return (
    <ListItem
      border="none"
      className="even:bg-slate-100 odd:bg-slate-200"
      href={`/admin/sensory/${src.id}`}
    >
      <ListItemIcon variant="icon">
        <Hop />
      </ListItemIcon>
      <ListItemText
        className="grow"
        primary={src.hopId}
        secondary={src.userId}
      />
    </ListItem>
  );
};
export const SensoryHome = ({ user, panels }: SensoryHomeProps) => {
  return (
    <div className="mx-auto lg:w-10/12 flex flex-col gap-0">
      <Section
        title="Hops"
        actions={
          <AppBarItem
            url="/admin/sensory"
            icon={<SquareArrowOutUpRight />}
            text="Go"
          />
        }
      >
        <List>
          {panels.map((panel) => (
            <HopSensoryListItem key={panel.id} src={panel} />
          ))}
        </List>

        <Prop label="Total Sensory Panels" value={panels.length} />
        <Prop label="% Complete" value={(panels.length ?? 0) / 500} />
      </Section>
    </div>
  );
};
export default SensoryHome;
