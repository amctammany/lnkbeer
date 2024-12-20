import { redirect } from "next/navigation";
//import { auth } from "@/app/auth";
export type LoginPageProps = {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};
export default async function LoginPage({ searchParams }: LoginPageProps) {
  const res = await searchParams;
  return redirect(
    `/api/auth/signin?callbackUrl=${(res.returnUrl ?? "/admin").toString()}`,
  );
}
