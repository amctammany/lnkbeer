import { AppBarLayout } from "@/components/AppBarLayout";
import AppBarTitle from "@/components/AppBarTitle";
import { TableSkeleton } from "@/components/DataTable/TableSkeleton";
import { ActivitySquare } from "lucide-react";

const headers = ["Name"];
export default function Loading() {
  return (
    <AppBarLayout
      title={<AppBarTitle icon={<ActivitySquare />}>Profiles</AppBarTitle>}
    >
      <TableSkeleton headers={headers} />
    </AppBarLayout>
  );
}
