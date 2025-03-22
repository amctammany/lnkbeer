import { auth } from "@/app/auth";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/client";
import { SensoryHopEditor } from "@/app/admin/_components/SensoryHopEditor";
import { getHop } from "@/app/ingredients/hops/queries";
import { createHopNote } from "@/app/ingredients/hops/actions";
import { ExtendedHopNote } from "@/types/ingredient";
//import { Dashboard } from "./_components/Dashboard";
//const AdminModal = dynamic(
//() => import("./AdminModal").then((s) => s.AdminModal),
//{ ssr: false }
//);

//import { auth } from "@/app/auth";
export type SensoryHopCreatorPageProps = {
  params: Promise<{ slug: string }>;
};
export default async function SensoryHopCreatorPage({
  params,
}: SensoryHopCreatorPageProps) {
  const { slug } = await params;
  const session = await auth();
  const aromas = await prisma.characteristicAroma.findMany();

  if (!session || !session?.user?.email) return redirect("/");
  const hop = await getHop(slug);
  if (!hop) notFound();
  const note = {
    hopId: hop.id,
    slug: hop.slug,
    userId: session.user.id,
    userEmail: session.user.email,
  } as ExtendedHopNote;
  return (
    <SensoryHopEditor
      hop={hop}
      note={note}
      action={createHopNote}
      aromas={aromas}
    />
  );
}
