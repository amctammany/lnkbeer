import { auth } from "@/app/auth";
//import { Label } from "@/components/Label";
import { Button } from "@/components/ui/button";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { CircleUserRound, LogIn, NewspaperIcon } from "lucide-react";
import Link from "next/link";
//import Link from "next/link";
export type AdminNavProps = any;

const Text: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <span className="font-extrabold ">{children}</span>;
};
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
  /**
   (
    <>
      <Link href="/admin">
        <Button
          variant="link"
          //prefetch={false}
          className={"flex-grow flex text-center font-bold  "}
        >
          Admin
        </Button>
      </Link>
    </>
  )*
  return (
    <div className="flex flex-shrink items-center flex-row font-medium p-2 md:p-0  md:space-x-8">
      <div className="md:hidden ">{body}</div>

      <div className="hidden w-full flex-grow md:flex lg:items-center lg:w-auto">
        <div className="flex flex-grow items-center flex-row font-medium p-2 md:p-0  md:space-x-8">
          {body}
        </div>
      </div>
    </div>
  );
   */
}

export default AdminNav;
