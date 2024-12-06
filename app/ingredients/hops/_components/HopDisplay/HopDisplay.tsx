import { AppBarAction } from "@/components/AppBar";
import { AppBarLayout } from "@/components/AppBarLayout";
import { HopInput } from "@/types/ingredient";
import { Hop } from "@prisma/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CompositionTab from "./CompositionTab";
import SummaryTab from "./SummaryTab";
import { Hop as HopIcon } from "lucide-react";

export type HopDisplayProps = {
  hop?: Hop | null;
};
const makeActions: (hop: Hop) => AppBarAction[] = (hop) => [
  { text: "Edit", url: `/ingredients/hops/${hop.slug}/edit` },
];
export function HopDisplay({ hop }: HopDisplayProps) {
  if (!hop) return <div>Bad</div>;
  return (
    <AppBarLayout title={`Hop: ${hop?.name}`} actions={makeActions(hop!)}>
      <Tabs defaultValue="summary" className="">
        <TabsList className="flex justify-start">
          <HopIcon className="size-4 mx-4" />
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="composition">Oil Composition</TabsTrigger>
        </TabsList>

        <TabsContent value="summary">
          <SummaryTab src={hop} />
        </TabsContent>
        <TabsContent value="composition">
          <CompositionTab src={hop} />
        </TabsContent>
      </Tabs>
    </AppBarLayout>
  );
}

export default HopDisplay;
