import { AppBarLayout } from "@/components/AppBarLayout";
import AppBarTitle from "@/components/AppBarTitle";
import { Wheat } from "lucide-react";

export default function Loading() {
  return (
    <AppBarLayout
      title={<AppBarTitle icon={<Wheat />}>Fermentables</AppBarTitle>}
    >
      <div>Loading Fermentables...</div>
    </AppBarLayout>
  );
}
