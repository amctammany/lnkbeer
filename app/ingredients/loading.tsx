import { AppBarLayout } from "@/components/AppBarLayout";
import AppBarTitle from "@/components/AppBarTitle";
import { Hop } from "lucide-react";

export default function Loading() {
  return (
    <AppBarLayout title={<AppBarTitle icon={<Hop />}>Ingredients</AppBarTitle>}>
      <div>Loading Ingredients...</div>
    </AppBarLayout>
  );
}
