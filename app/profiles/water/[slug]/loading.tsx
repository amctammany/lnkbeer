import { AppBarLayout } from "@/components/AppBarLayout";
import AppBarTitle from "@/components/AppBarTitle";
import { Waves } from "lucide-react";

export default function Loading() {
  return (
    <AppBarLayout
      title={<AppBarTitle icon={<Waves />}>Water Profile</AppBarTitle>}
    >
      Loading
    </AppBarLayout>
  );
}
