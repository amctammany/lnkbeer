import { AppBarItem } from "@/components/AppBarItem";
import { Prop } from "@/components/Prop";
import Section from "@/components/Section";
import type { HopSensoryPanel, User } from "@prisma/client";
import { SquareArrowOutUpRight } from "lucide-react";

export interface SensoryDisplayProps {
  //user?: ExtendedUser | null;
  panel?: HopSensoryPanel; // Pick<HopSensoryPanel, "id" | "hopId" | "year">[];
  //action?: any;
  //children: React.ReactNode;
}

export const SensoryDisplay = ({ panel }: SensoryDisplayProps) => {
  return (
    <div className="mx-auto lg:w-10/12 flex flex-col gap-0">
      <Section
        title="Sensory Display"
        actions={
          <AppBarItem
            url="/admin/sensory"
            icon={<SquareArrowOutUpRight />}
            text="Go"
          />
        }
      >
        {JSON.stringify(panel)}
      </Section>
    </div>
  );
};
export default SensoryDisplay;
