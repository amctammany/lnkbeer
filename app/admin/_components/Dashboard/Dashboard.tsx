import { Prop } from "@/components/Prop";
import Section from "@/components/Section";
import type { User } from "@prisma/client";

export interface DashboardProps {
  user?: User | null;
  //action?: any;
  //children: React.ReactNode;
}

export const Dashboard = ({ user }: DashboardProps) => {
  return (
    <div className="mx-auto w-10/12 grid grid-flow-row gap-8">
      <h2 className="text-2xl text-center">Dashboard</h2>
      <Section>
        <Prop label="Name" value={user?.name} />
        <Prop label="Email" value={user?.email} />
      </Section>
    </div>
  );
};
export default Dashboard;
