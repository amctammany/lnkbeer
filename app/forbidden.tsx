import Link from "next/link";

export default function Forbidden() {
  return (
    <main className="mx-auto my-auto p-4">
      <h2 className="text-lg font-bold mx-2 my-4">Forbidden</h2>
      <p>You are not authorized to access this resource.</p>
      <Link className="underline px-2" href="/">
        Return Home
      </Link>
    </main>
  );
}
