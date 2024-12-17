import { getYeasts } from "@/app/ingredients/yeasts/queries";
import YeastsTable from "./_components/YeastsTable/YeastsTable";
import { AppBarLayout } from "@/components/AppBarLayout";
import AppBarTitle from "@/components/AppBarTitle";
import { FlaskConical } from "lucide-react";
import { YeastsTableActions } from "@/app/ingredients/yeasts/_components/YeastsTable/YeastsTableActions";
export const metadata = {
  title: "LNK: Yeasts",
};

export default async function YeastsListPage() {
  const yeasts = await getYeasts();
  return (
    <AppBarLayout
      title={<AppBarTitle icon={<FlaskConical />}>Yeasts</AppBarTitle>}
      actions={<YeastsTableActions />}
    >
      <YeastsTable yeasts={yeasts} />
    </AppBarLayout>
  );
}
