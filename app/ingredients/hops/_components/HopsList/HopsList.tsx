import { Hop } from "@prisma/client";
import Link from "next/link";

export type HopsListProps = {
  hops?: Hop[];
};
export function HopsList({ hops = [] }: HopsListProps) {
  return (
    <div className="">
      {hops.map((hop) => (
        <Link
          className="block px-2 py-3"
          key={hop.id}
          href={`/ingredients/hops/${hop.slug}`}
        >
          {hop.name}
        </Link>
      ))}
    </div>
  );
}

export default HopsList;
