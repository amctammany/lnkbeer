import { getFermentables } from "@/app/ingredients/fermentables/queries";
import { FermentablesTable } from "./_components/FermentablesTable/FermentablesTable";
export const metadata = {
  title: "LNK: Fermentables",
};

export default async function FermentablesTablePage() {
  const fermentables = await getFermentables();
  return <FermentablesTable fermentables={fermentables} />;
}
