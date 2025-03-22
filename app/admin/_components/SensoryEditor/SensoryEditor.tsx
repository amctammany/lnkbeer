import { AppBarItem } from "@/components/AppBarItem";
import Section from "@/components/Section";
import type { HopSensoryPanel } from "@prisma/client";
import { SquareArrowOutUpRight } from "lucide-react";

export interface SensoryEditorProps {
  //user?: ExtendedUser | null;
  panel?: HopSensoryPanel; // Pick<HopSensoryPanel, "id" | "hopId" | "year">[];
  //action?: any;
  //children: React.ReactNode;
}

export const SensoryEditor = ({ panel }: SensoryEditorProps) => {
  return (
    <div className="mx-auto lg:w-10/12 flex flex-col gap-0">
      <Section
        title="Sensory Editor"
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
export default SensoryEditor;
