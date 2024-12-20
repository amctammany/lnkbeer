"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Unauthorized() {
  const pathname = usePathname();
  return (
    <main className="mx-auto my-auto p-4">
      <h1 className="text-2xl font-bold mx-2 my-4">401 - Unauthorized</h1>
      <p>
        Please
        <Link
          className="underline px-2"
          href={`/admin/login?returnUrl=${pathname}`}
        >
          Log In
        </Link>
        to access this page.
      </p>
    </main>
  );
}
