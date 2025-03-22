import { auth } from "@/app/auth";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/client";
import { SensoryHopDisplay } from "@/app/admin/_components/SensoryHopDisplay";
import { getHop } from "@/app/ingredients/hops/queries";
//import { Dashboard } from "./_components/Dashboard";
//const AdminModal = dynamic(
//() => import("./AdminModal").then((s) => s.AdminModal),
//{ ssr: false }
//);

//import { auth } from "@/app/auth";
export type SensoryHopDisplayPageProps = {
  params: Promise<{ slug: string }>;
};
export default async function SensoryHopDisplayPage({
  params,
}: SensoryHopDisplayPageProps) {
  const { slug } = await params;
  const session = await auth();

  if (!session || !session?.user?.email) return redirect("/");
  const hop = await getHop(slug);
  if (!hop) notFound();
  const notes = await prisma.hopNote.findMany({
    where: {
      userId: session.user.id,
      hopId: hop.id,
    },
    include: {
      sensoryPanel: { include: { aromas: true } },
    },
  });
  return <SensoryHopDisplay hop={hop} notes={notes} />;
}
