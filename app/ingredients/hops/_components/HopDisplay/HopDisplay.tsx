import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CompositionTab from "./CompositionTab";
import SummaryTab from "./SummaryTab";
import { Hop as HopIcon } from "lucide-react";
import { getHop } from "@/app/ingredients/hops/queries";
import { Suspense } from "react";

export type HopDisplayProps = {
  slug: string;
};

export async function HopDisplay({ slug }: HopDisplayProps) {
  const hop = await getHop(slug);
  if (!hop) return <div>Bad</div>;
  return (
    <Tabs defaultValue="summary" className="">
      <TabsList className="flex justify-start">
        <HopIcon className="size-4 mx-4" />
        <TabsTrigger value="summary">Summary</TabsTrigger>
        <TabsTrigger value="composition">Oil Composition</TabsTrigger>
      </TabsList>

      <TabsContent value="summary">
        <Suspense fallback={<div>Loading</div>}>
          <SummaryTab src={hop} />
        </Suspense>
      </TabsContent>
      <TabsContent value="composition">
        <Suspense fallback={<div>Loading</div>}>
          <CompositionTab src={hop} />
        </Suspense>
      </TabsContent>
    </Tabs>
  );
}

export default HopDisplay;
