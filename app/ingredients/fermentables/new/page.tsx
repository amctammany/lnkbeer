import { FermentableEditor } from "@/app/ingredients/fermentables/_components/FermentableEditor";
import { createFermentable } from "../actions";
import { FermentableInput } from "@/types/ingredient";
import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
export function generateMetadata() {
  return {
    title: "LNK Create Fermentable",
  };
}

export default async function FermentableCreatorPage() {
  const session = await auth();
  if (!session?.user)
    return redirect("/admin/login?callbackUrl=/ingredients/fermentables/new");
  const fermentable = { userId: session.user.id } as Partial<FermentableInput>;

  return (
    <FermentableEditor fermentable={fermentable} action={createFermentable} />
  );
}
