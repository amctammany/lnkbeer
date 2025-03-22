import { AppBarItem } from "@/components/AppBarItem";
import { AppBarLayout } from "@/components/AppBarLayout";
import { Prop } from "@/components/Prop";
import Section from "@/components/Section";
import { ExtendedUser } from "@/types/User";
import { LogOut, SquareArrowOutUpRight } from "lucide-react";

export interface DashboardProps {
  user?: ExtendedUser | null;
  //action?: any;
  //children: React.ReactNode;
}

export const DashboardActions = () => {
  return [
    <AppBarItem
      key="logout "
      icon={<LogOut />}
      text="Logout"
      url="/api/auth/signout"
    />,
  ];
};
export const Dashboard = ({ user }: DashboardProps) => {
  return (
    <AppBarLayout title="Dashboard" actions={<DashboardActions />}>
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
    </AppBarLayout>
  );
};
export default Dashboard;
