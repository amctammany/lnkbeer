import { AppBarLayout } from "@/components/AppBarLayout";
import AppBarTitle from "@/components/AppBarTitle";
import { FlaskConical } from "lucide-react";

export default function Loading() {
  return (
    <AppBarLayout
      title={<AppBarTitle icon={<FlaskConical />}>Yeast</AppBarTitle>}
    >
      Loading Yeast...
    </AppBarLayout>
  );
}
