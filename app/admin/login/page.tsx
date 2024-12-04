import { redirect } from "next/navigation";
//import { auth } from "@/app/auth";
export type LoginPageProps = {
  params: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};
export default async function LoginPage({ params }: LoginPageProps) {
  const searchParams = await params;
  return redirect(
    `/api/auth/signin?callbackUrl=${(searchParams.returnUrl ?? "/admin").toString()}`,
  );
}
