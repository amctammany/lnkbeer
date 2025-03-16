import { YeastEditor } from "@/app/ingredients/yeasts/_components/YeastEditor";
import { createYeast } from "../actions";
import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import { YeastInput } from "@/types/ingredient";
export function generateMetadata() {
  return {
    title: "LNK Create Yeast",
  };
}

export default async function YeastCreatorPage() {
  const session = await auth();
  if (!session?.user)
    return redirect("/admin/login?callbackUrl=/ingredients/yeasts/new");
  const yeast = { userId: session.user.id } as YeastInput;

  return <YeastEditor yeast={yeast} action={createYeast} />;
}
