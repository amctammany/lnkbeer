import { getHops } from "@/app/ingredients/hops/queries";
import { HopsTable } from "./_components/HopsTable/HopsTable";
import { AppBarLayout } from "@/components/AppBarLayout";
import { HopsTableActions } from "@/app/ingredients/hops/_components/HopsTable/HopsTableActions";
export const metadata = {
  title: "LNK: Hops",
};

export default async function HopsListPage() {
  const hops = await getHops();
  return (
    <AppBarLayout title="Hops List" actions={<HopsTableActions />}>
      <HopsTable hops={hops} />;
    </AppBarLayout>
  );
}
