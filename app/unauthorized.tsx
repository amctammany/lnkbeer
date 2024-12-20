"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Unauthorized() {
  const pathname = usePathname();
  return (
    <main>
      <h1>401 - Unauthorized</h1>
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
