import { AppBarLayout } from "@/components/AppBarLayout";
import type { User } from "@prisma/client";

export interface DashboardProps {
  src?: User | null;
  //action?: any;
  //children: React.ReactNode;
}

export const Dashboard = ({ src }: DashboardProps) => {
  return (
    <AppBarLayout title="Dashboard">
      <div className="mx-auto w-10/12 grid grid-flow-row gap-8">Dashboard</div>
    </AppBarLayout>
  );
};
export default Dashboard;
