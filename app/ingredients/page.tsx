import { HopsList } from "@/app/ingredients/hops/_components/HopsList";
import { getHops } from "@/app/ingredients/hops/queries";
export const metadata = {
  title: "LNK: Hops",
};

export default async function IngredientsPage() {
  const hops = await getHops();
  return <HopsList hops={hops} />;
}
