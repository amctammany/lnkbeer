import { FermentableEditor } from "@/app/ingredients/fermentables/_components/FermentableEditor";
import { createFermentable } from "../actions";
import { FermentableInput } from "@/types/ingredient";
export function generateMetadata() {
  return {
    title: "LNK Create Fermentable",
  };
}

export default async function FermentableCreatorPage() {
  const fermentable = {} as FermentableInput;
  return (
    <FermentableEditor fermentable={fermentable} action={createFermentable} />
  );
}
