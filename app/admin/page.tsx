import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/client";
import { Dashboard } from "./_components/Dashboard";
import type { User } from "@prisma/client";
//const AdminModal = dynamic(
//() => import("./AdminModal").then((s) => s.AdminModal),
//{ ssr: false }
//);

//import { auth } from "@/app/auth";
export default async function Page() {
  const session = await auth();

  if (!session || !session?.user?.email) return redirect("/");
  console.log(session);
  const user = await prisma.user.findFirst({
    where: { email: session?.user?.email },
  });
  return <Dashboard src={user} />;
}
