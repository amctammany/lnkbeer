import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/client";
import { SensoryEditor } from "@/app/admin/_components/SensoryEditor";
//import { Dashboard } from "./_components/Dashboard";
//const AdminModal = dynamic(
//() => import("./AdminModal").then((s) => s.AdminModal),
//{ ssr: false }
//);

//import { auth } from "@/app/auth";
export default async function Page({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const session = await auth();
  const { id } = await params;

  if (!session || !session?.user?.email) return redirect("/");
  const panel = await prisma.hopSensoryPanel.findFirst({
    where: { id: parseInt(id) },
    //select: { hopId: true, uid: true, sensoryPanelId: true },
  });
  return <SensoryEditor panel={panel as any} />;
}
