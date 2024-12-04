import { HopsList } from "@/app/ingredients/hops/_components/HopsList";
import { getHops } from "@/app/ingredients/hops/queries";
import HopsTable from "./_components/HopsTable/HopsTable";
export const metadata = {
  title: "LNK: Hops",
};

export default async function HopsListPage() {
  const hops = await getHops();
  return <HopsTable hops={hops} />;
  //return <HopsList hops={hops} />;
}
