import { AppBarLayout } from "@/components/AppBarLayout";
import AppBarTitle from "@/components/AppBarTitle";
import { TableSkeleton } from "@/components/DataTable/TableSkeleton";
import { Wheat } from "lucide-react";

const headers = ["Name", "Country", "Color", "Potential", "Power"];
export default function Loading() {
  return (
    <AppBarLayout
      title={<AppBarTitle icon={<Wheat />}>Fermentables</AppBarTitle>}
    >
      <TableSkeleton headers={headers}>Loading Fermentables</TableSkeleton>
    </AppBarLayout>
  );
}
