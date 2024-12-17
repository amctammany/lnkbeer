import { getFermentables } from "@/app/ingredients/fermentables/queries";
import { FermentablesTable } from "./_components/FermentablesTable/FermentablesTable";
import { AppBarLayout } from "@/components/AppBarLayout";
import FermentablesTableActions from "./_components/FermentablesTable/FermentablesTableActions";
import AppBarTitle from "@/components/AppBarTitle";
import { Wheat } from "lucide-react";
export const metadata = {
  title: "LNK: Fermentables",
};

export default async function FermentablesTablePage() {
  const fermentables = await getFermentables();
  return (
    <AppBarLayout
      title={<AppBarTitle icon={<Wheat />}>Fermentables</AppBarTitle>}
      actions={<FermentablesTableActions />}
    >
      <FermentablesTable fermentables={fermentables} />;
    </AppBarLayout>
  );
}
