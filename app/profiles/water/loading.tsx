import { AppBarLayout } from "@/components/AppBarLayout";
import AppBarTitle from "@/components/AppBarTitle";
import { Anvil } from "lucide-react";

export default function Loading() {
  return (
    <AppBarLayout title={<AppBarTitle icon={<Anvil />}>Profiles</AppBarTitle>}>
      <div>Loading Profiles...</div>
    </AppBarLayout>
  );
}
