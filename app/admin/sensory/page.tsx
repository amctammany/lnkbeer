import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/client";
import { SensoryHome } from "../_components/SensoryHome";
import { ExtendedUser } from "@/types/User";
//import { Dashboard } from "./_components/Dashboard";
//const AdminModal = dynamic(
//() => import("./AdminModal").then((s) => s.AdminModal),
//{ ssr: false }
//);

//import { auth } from "@/app/auth";
export default async function Page() {
  const session = await auth();

  if (!session || !session?.user?.email) return redirect("/");
  const panels = await prisma.hopSensoryPanel.findMany({
    where: { userId: session.user.id },
    select: { hopId: true, id: true, userId: true },
  });
  const user = await prisma.user.findFirst({
    where: { email: session?.user?.email },
    include: { hopSensoryPanels: { select: { id: true, hopId: true } } },
  });
  return <SensoryHome user={user as ExtendedUser} panels={panels} />;
}
