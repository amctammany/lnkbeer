import { HopEditor } from "@/app/ingredients/hops/_components/HopEditor";
import { Hop } from "@prisma/client";
import { createHop } from "../actions";
export function generateMetadata() {
  return {
    title: "LNK Create Hop",
  };
}

export default async function HopCreatorPage() {
  const hop = {} as Hop;
  return <HopEditor hop={hop} action={createHop} />;
}
