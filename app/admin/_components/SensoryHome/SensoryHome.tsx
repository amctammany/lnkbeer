import { Prop } from "@/components/Prop";
import Section from "@/components/Section";
import { ExtendedUser } from "@/types/User";
import type { Hop as HopType, HopSensoryPanel } from "@prisma/client";
import { Hop } from "lucide-react";
import Link from "next/link";

export interface SensoryHomeProps {
  user?: ExtendedUser | null;
  panels: Pick<HopSensoryPanel, "id" | "hopId" | "userId">[];
  hops: HopType[];
  //action?: any;
  //children: React.ReactNode;
}
import { ListItem } from "@/components/List/ListItem";
import { ListItemIcon } from "@/components/List/ListItemIcon";
import { ListItemText } from "@/components/List/ListItemText";
import { List } from "@/components/List/List";
import { AppBarLayout } from "@/components/AppBarLayout";

export type HopListItemProps = {
  src: Pick<HopType, "id" | "name" | "country" | "slug">;
  active?: boolean;
};
export const HopListItem = ({ src, active = false }: HopListItemProps) => {
  return (
    <Link href={`/admin/sensory/hops/${src.slug}`}>
      <li
        className={
          active ? "bg-red-500/10 hover:bg-blue-400 " : "hover:bg-blue-50"
        }
      >
        {src.name}
      </li>
    </Link>
  );
};

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
export const SensoryHome = ({ user, hops, panels }: SensoryHomeProps) => {
  return (
    <AppBarLayout title="SensoryHome">
      <div className="mx-auto lg:w-10/12 flex flex-col gap-0">
        <Section title="Panels">
          <List>
            {panels.map((panel) => (
              <HopSensoryListItem key={panel.id} src={panel} />
            ))}
          </List>

          <Prop label="Total Sensory Panels" value={panels.length} />
          <Prop label="% Complete" value={(panels.length ?? 0) / 500} />
        </Section>
        <Section title="Hops">
          <div className="h-[300px] overflow-auto">
            <List className="h-full overflow-auto">
              {hops.map((hop) => (
                <HopListItem
                  key={hop.id}
                  src={hop}
                  active={
                    !!user?.hopSensoryPanels.find(
                      ({ hopId }) => hopId === hop.id,
                    )
                  }
                />
              ))}
            </List>
          </div>
        </Section>
      </div>
    </AppBarLayout>
  );
};
export default SensoryHome;
