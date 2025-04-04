import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/client";
import { Dashboard } from "./_components/Dashboard";
import { ExtendedUser } from "@/types/User";
//const AdminModal = dynamic(
//() => import("./AdminModal").then((s) => s.AdminModal),
//{ ssr: false }
//);

//import { auth } from "@/app/auth";
export default async function Page() {
  const session = await auth();

  if (!session || !session?.user?.email) return redirect("/");
  const user = await prisma.user.findFirst({
    where: { email: session?.user?.email },
    include: { hopSensoryPanels: { select: { id: true, hopId: true } } },
  });
  return <Dashboard user={user as ExtendedUser} />;
}
