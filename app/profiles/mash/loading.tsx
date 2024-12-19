import { AppBarLayout } from "@/components/AppBarLayout";
import AppBarTitle from "@/components/AppBarTitle";
import { Thermometer } from "lucide-react";

export default function Loading() {
  return (
    <AppBarLayout
      title={<AppBarTitle icon={<Thermometer />}>Mash Profiles</AppBarTitle>}
    >
      <div>Loading Profiles...</div>
    </AppBarLayout>
  );
}
