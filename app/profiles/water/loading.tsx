import { AppBarLayout } from "@/components/AppBarLayout";
import AppBarTitle from "@/components/AppBarTitle";
import { TableSkeleton } from "@/components/DataTable/TableSkeleton";
import { Anvil } from "lucide-react";

const headers = ["name"];
export default function Loading() {
  return (
    <AppBarLayout title={<AppBarTitle icon={<Anvil />}>Profiles</AppBarTitle>}>
      <TableSkeleton headers={headers} />
    </AppBarLayout>
  );
}
