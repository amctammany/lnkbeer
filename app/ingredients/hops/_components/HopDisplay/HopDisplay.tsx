import { AppBarAction } from "@/components/AppBar";
import { AppBarLayout } from "@/components/AppBarLayout";
import { Hop } from "@prisma/client";

export type HopDisplayProps = {
  hop?: Hop | null;
};
const makeActions: (hop: Hop) => AppBarAction[] = (hop) => [
  { text: "Edit", url: `/ingredients/hops/${hop.slug}/edit` },
];
export function HopDisplay({ hop }: HopDisplayProps) {
  return (
    <AppBarLayout title={`Hop: ${hop?.name}`} actions={makeActions(hop!)}>
      <div className="">
        {Object.entries(hop || {}).map(([key, value]) => (
          <div key={key} className="flex border-2 mb-1">
            <span className="bg-slate-200 px-2">{key}</span>
            <span className="flex-grow px-2">{value}</span>
          </div>
        ))}
      </div>
    </AppBarLayout>
  );
}

export default HopDisplay;
