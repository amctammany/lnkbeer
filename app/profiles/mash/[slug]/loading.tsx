import { AppBarLayout } from "@/components/AppBarLayout";
import AppBarTitle from "@/components/AppBarTitle";
import { Thermometer } from "lucide-react";

export default function Loading() {
  return (
    <AppBarLayout
      title={<AppBarTitle icon={<Thermometer />}>Mash Profile</AppBarTitle>}
    >
      Loading
    </AppBarLayout>
  );
}
