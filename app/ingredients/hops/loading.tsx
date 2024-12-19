import { AppBarLayout } from "@/components/AppBarLayout";
import AppBarTitle from "@/components/AppBarTitle";
import { Hop } from "lucide-react";
import { TableSkeleton } from "@/components/DataTable/TableSkeleton";

export default function Loading() {
  return (
    <AppBarLayout title={<AppBarTitle icon={<Hop />}>Hops</AppBarTitle>}>
      <TableSkeleton headers={["Name", "Country", "Alpha", "Beta", "Usage"]}>
        Loading Hops
      </TableSkeleton>
    </AppBarLayout>
  );
}
