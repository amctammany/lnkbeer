import { FermentableSummaryTab } from "@/app/ingredients/fermentables/_components/FermentableDisplay/FermentableSummaryTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Fermentable } from "@prisma/client";
import { Wheat } from "lucide-react";
import { FermentableAnalyticsTab } from "./FermentableAnalyticsTab";

export type FermentableDisplayProps = {
  src?: Fermentable | null;
};
export function FermentableDisplay({ src }: FermentableDisplayProps) {
  return (
    <Tabs defaultValue="summary" className="">
      <TabsList className="flex justify-start">
        <Wheat className="size-4 mx-4" />
        <TabsTrigger value="summary">Summary</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
      </TabsList>

      <TabsContent value="summary">
        <FermentableSummaryTab src={src} />
      </TabsContent>
      <TabsContent value="analytics">
        <FermentableAnalyticsTab src={src} />
      </TabsContent>
    </Tabs>
  );
}

export default FermentableDisplay;
