import { AppBarAction } from "@/components/AppBar";
import { AppBarLayout } from "@/components/AppBarLayout";
import type { User } from "@prisma/client";
import { LogOut } from "lucide-react";

export interface DashboardProps {
  src?: User | null;
  //action?: any;
  //children: React.ReactNode;
}

const DashboardActions = () => {
  return [
    <AppBarAction
      key="signout"
      text="Sign Out"
      url="/api/auth/signout"
      icon={<LogOut />}
    />,
  ];
};
export const Dashboard = ({ src }: DashboardProps) => {
  return (
    <AppBarLayout title="Dashboard" actions={<DashboardActions />}>
      <div className="mx-auto w-10/12 grid grid-flow-row gap-8">
        {JSON.stringify(src)}
      </div>
    </AppBarLayout>
  );
};
export default Dashboard;
