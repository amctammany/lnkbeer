import { HopEditor } from "@/app/ingredients/hops/_components/HopEditor";
import { Hop } from "@prisma/client";
import { createHop } from "../actions";
import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
export function generateMetadata() {
  return {
    title: "LNK Create Hop",
  };
}

export default async function HopCreatorPage() {
  const session = await auth();
  if (!session?.user)
    return redirect("/admin/login?callbackUrl=/ingredients/hops/new");
  const hop = { userId: session.user.id } as any;

  return <HopEditor hop={hop} action={createHop} />;
}
