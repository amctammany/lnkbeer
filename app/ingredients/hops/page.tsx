import { getHops } from "@/app/ingredients/hops/queries";
import { HopsTable } from "./_components/HopsTable/HopsTable";
import { AppBarLayout } from "@/components/AppBarLayout";
import { HopsTableActions } from "@/app/ingredients/hops/_components/HopsTable/HopsTableActions";
import AppBarTitle from "@/components/AppBarTitle";
import { HopIcon } from "lucide-react";
export const metadata = {
  title: "LNK: Hops",
};

export default async function HopsListPage() {
  const hops = await getHops();
  return (
    <AppBarLayout
      title={<AppBarTitle icon={<HopIcon />}>List</AppBarTitle>}
      actions={<HopsTableActions />}
    >
      <HopsTable hops={hops} />;
    </AppBarLayout>
  );
}
