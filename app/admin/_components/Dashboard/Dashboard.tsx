import { AppBarLayout } from "@/components/AppBarLayout";
import type { User } from "@prisma/client";

export interface DashboardProps {
  src?: User | null;
  //action?: any;
  //children: React.ReactNode;
}

export const Dashboard = ({ src }: DashboardProps) => {
  return (
    <AppBarLayout
      title="Dashboard"
      actions={[{ text: "Sign Out", url: "/api/auth/signout" }]}
    >
      <div className="mx-auto w-10/12 grid grid-flow-row gap-8">
        {JSON.stringify(src)}
      </div>
    </AppBarLayout>
  );
};
export default Dashboard;
