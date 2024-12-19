import { auth } from "@/app/auth";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { CircleUserRound, LogIn } from "lucide-react";
import Link from "next/link";
//import Link from "next/link";
export type AdminNavProps = any;

export async function AdminNav({}: AdminNavProps) {
  const session = await auth();
  const body = session ? (
    <SidebarMenuButton tooltip="Admin" asChild>
      <Link href="/admin" prefetch={false}>
        <CircleUserRound />
        <span>Admin</span>
      </Link>
    </SidebarMenuButton>
  ) : (
    <SidebarMenuButton tooltip="Admin" asChild>
      <Link href="/admin/login" prefetch={false}>
        <LogIn />
        <span>Sign In</span>
      </Link>
    </SidebarMenuButton>
  );
  return <>{body}</>;
}

export default AdminNav;
