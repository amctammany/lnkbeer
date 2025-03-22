import { List } from "@/components/List/List";
import Section from "@/components/Section";
import { ExtendedUser } from "@/types/User";
import { Hop } from "@prisma/client";
import SensoryHopsListItem from "./SensoryHopsListItem";

export type SensoryHopsProps = {
  user: ExtendedUser;
  hops: Hop[];
};
export const SensoryHops = ({ user, hops }: SensoryHopsProps) => {
  return (
    <div className="mx-auto lg:w-10/12 flex flex-col gap-0">
      <Section title="Hops">
        <div className="h-[300px] overflow-auto">
          <List className="h-full overflow-auto">
            {hops.map((hop) => (
              <SensoryHopsListItem
                key={hop.id}
                hop={hop}
                active={
                  !!user?.hopSensoryPanels.find(({ hopId }) => hopId === hop.id)
                }
              />
            ))}
          </List>
        </div>
      </Section>
    </div>
  );
};
export default SensoryHopsListItem;
