import { AppBarLayout } from "@/components/AppBarLayout";
import AppBarTitle from "@/components/AppBarTitle";
import { ActivitySquare } from "lucide-react";

export default function Loading() {
  return (
    <AppBarLayout
      title={<AppBarTitle icon={<ActivitySquare />}>Profiles</AppBarTitle>}
    >
      <div>Loading Profiles...</div>
    </AppBarLayout>
  );
}
