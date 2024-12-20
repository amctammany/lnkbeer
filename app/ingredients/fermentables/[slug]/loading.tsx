import { AppBarLayout } from "@/components/AppBarLayout";
import AppBarTitle from "@/components/AppBarTitle";
import { Wheat } from "lucide-react";

export default function Loading() {
  return (
    <AppBarLayout
      title={<AppBarTitle icon={<Wheat />}>Fermentable</AppBarTitle>}
    >
      Loading Fermentable
    </AppBarLayout>
  );
}
