import { AppBarItem } from "@/components/AppBarItem";
import { Prop } from "@/components/Prop";
import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import { ExtendedUser } from "@/types/User";
import type { User } from "@prisma/client";
import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

export interface DashboardProps {
  user?: ExtendedUser | null;
  //action?: any;
  //children: React.ReactNode;
}

export const Dashboard = ({ user }: DashboardProps) => {
  return (
    <div className="mx-auto lg:w-10/12 flex flex-col gap-0">
      <h2 className="text-2xl text-center">Dashboard</h2>
      <Section>
        <Prop label="Name" value={user?.name} />
        <Prop label="Email" value={user?.email} />
        <Prop label="Role" value={user?.role} />
      </Section>
      <Section
        title="Sensory"
        actions={
          <AppBarItem
            url="/admin/sensory"
            icon={<SquareArrowOutUpRight />}
            text="Go"
          />
        }
      >
        <Prop
          label="Total Sensory Panels"
          value={user?.hopSensoryPanels.length}
        />
        <Prop
          label="% Complete"
          value={(user?.hopSensoryPanels.length ?? 0) / 500}
        />
      </Section>
    </div>
  );
};
export default Dashboard;
