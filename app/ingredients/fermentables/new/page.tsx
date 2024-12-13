import { FermentableEditor } from "@/app/ingredients/fermentables/_components/FermentableEditor";
import { Fermentable } from "@prisma/client";
import { createFermentable } from "../actions";
export function generateMetadata() {
  return {
    title: "LNK Create Fermentable",
  };
}

export default async function FermentableCreatorPage() {
  const fermentable = {} as Fermentable;
  return <FermentableEditor src={fermentable} action={createFermentable} />;
}
