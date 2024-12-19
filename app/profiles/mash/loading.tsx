import { AppBarLayout } from "@/components/AppBarLayout";
import AppBarTitle from "@/components/AppBarTitle";
import { TableSkeleton } from "@/components/DataTable/TableSkeleton";
import { Thermometer } from "lucide-react";

const headers = ["Name"];
export default function Loading() {
  return (
    <AppBarLayout
      title={<AppBarTitle icon={<Thermometer />}>Profiles</AppBarTitle>}
    >
      <TableSkeleton headers={headers} />
    </AppBarLayout>
  );
}
