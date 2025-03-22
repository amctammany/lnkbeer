import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/client";
import { SensoryHops } from "@/app/admin/_components/SensoryHops";
import { ExtendedUser } from "@/types/User";
import { getHops } from "@/app/ingredients/hops/queries";
//import { Dashboard } from "./_components/Dashboard";
//const AdminModal = dynamic(
//() => import("./AdminModal").then((s) => s.AdminModal),
//{ ssr: false }
//);

//import { auth } from "@/app/auth";
export default async function SensoryHopsPage() {
  const session = await auth();

  if (!session || !session?.user?.email) return redirect("/");
  const hops = await getHops();
  const user = await prisma.user.findFirst({
    where: { email: session?.user?.email },
    include: { hopSensoryPanels: { select: { id: true, hopId: true } } },
  });
  return <SensoryHops hops={hops} user={user as ExtendedUser} />;
}
