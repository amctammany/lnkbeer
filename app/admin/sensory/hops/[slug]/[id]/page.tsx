import { auth } from "@/app/auth";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/client";
import { SensoryHopEditor } from "@/app/admin/_components/SensoryHopEditor";
import { ExtendedUser } from "@/types/User";
import { getHop, getHops } from "@/app/ingredients/hops/queries";
import { updateHopNote } from "@/app/ingredients/hops/actions";
import { SensoryHopDisplay } from "@/app/admin/_components/SensoryHopDisplay";
//import { Dashboard } from "./_components/Dashboard";
//const AdminModal = dynamic(
//() => import("./AdminModal").then((s) => s.AdminModal),
//{ ssr: false }
//);

//import { auth } from "@/app/auth";
export type SensoryHopDisplayPageProps = {
  params: Promise<{ slug: string; id: string }>;
};
export default async function SensoryHopDisplayPage({
  params,
}: SensoryHopDisplayPageProps) {
  const { slug, id } = await params;
  const session = await auth();

  if (!session || !session?.user?.email) return redirect("/");
  const hop = await getHop(slug);
  if (!hop) notFound();
  //const aromas = await prisma.characteristicAroma.findMany();
  const note = await prisma.hopNote.findFirst({
    where: {
      //userId: session.user.id,
      uid: parseInt(id),
      hopId: hop.id,
    },
    include: {
      sensoryPanel: { include: { aromas: true } },
    },
  });
  if (!note) notFound();
  return <SensoryHopDisplay hop={hop} note={note} />;
}
