import { YeastEditor } from "@/app/ingredients/yeasts/_components/YeastEditor";
import { Yeast } from "@prisma/client";
import { createYeast } from "../actions";
export function generateMetadata() {
  return {
    title: "LNK Create Yeast",
  };
}

export default async function YeastCreatorPage() {
  const yeast = {} as Yeast;
  return <YeastEditor src={yeast} action={createYeast} />;
}
