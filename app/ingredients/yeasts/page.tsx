import { getYeasts } from "@/app/ingredients/yeasts/queries";
import YeastsTable from "./_components/YeastsTable/YeastsTable";
export const metadata = {
  title: "LNK: Yeasts",
};

export default async function YeastsListPage() {
  const yeasts = await getYeasts();
  return <YeastsTable yeasts={yeasts} />;
}
