import { HopsList } from "@/app/ingredients/hops/_components/HopsList";
import { getHops } from "@/app/ingredients/hops/queries";
export const metadata = {
  title: "LNK: Hops",
};

export default async function HopsListPage() {
  const hops = await getHops();
  return <HopsList hops={hops} />;
}
