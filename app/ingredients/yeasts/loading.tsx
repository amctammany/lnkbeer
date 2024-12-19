import { AppBarLayout } from "@/components/AppBarLayout";
import AppBarTitle from "@/components/AppBarTitle";
import { TableSkeleton } from "@/components/DataTable/TableSkeleton";
import { FlaskConical } from "lucide-react";

const headers = ["Name", "Manufacturer", "Attenuation", "Flocculation"];
export default function Loading() {
  return (
    <AppBarLayout
      title={<AppBarTitle icon={<FlaskConical />}>Ingredients</AppBarTitle>}
    >
      <TableSkeleton headers={headers}>Loading Yeasts</TableSkeleton>
    </AppBarLayout>
  );
}
