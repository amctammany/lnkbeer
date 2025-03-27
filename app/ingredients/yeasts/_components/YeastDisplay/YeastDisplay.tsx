import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { YeastInput } from "@/types/ingredient";
import { FlaskConical } from "lucide-react";
import { YeastSummaryTab } from "./YeastSummaryTab";
import { YeastAnalyticsTab } from "./YeastAnalyticsTab";

export type YeastDisplayProps = {
  src: YeastInput;
};

export function YeastDisplay({ src }: YeastDisplayProps) {
  return (
    <Tabs defaultValue="summary" className="">
      <TabsList className="flex justify-start">
        <FlaskConical className="size-4 mx-4" />
        <TabsTrigger value="summary">Summary</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
      </TabsList>

      <TabsContent value="summary">
        <YeastSummaryTab src={src} />
      </TabsContent>
      <TabsContent value="analytics">
        <YeastAnalyticsTab src={src} />
      </TabsContent>
    </Tabs>
  );
}

export default YeastDisplay;
