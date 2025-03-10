"use client";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ExtendedHop, HopSensoryChartData } from "@/types/ingredient";
import { AromaGroups, HopSensoryPanel } from "@prisma/client";

const chartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;
function makeChartData(src: ExtendedHop) {
  return src?.hopSensoryPanels?.map(
    ({
      sweetAromatic,
      pomme,
      citrus,
      melon,
      earthy,
      tropical,
      berry,
      stoneFruit,
      dank,
      herbal,
      floral,
      grassy,
      vegetal,
      woody,
      spicy,
    }) =>
      Object.entries({
        sweetAromatic,
        pomme,
        citrus,
        melon,
        dank,
        tropical,
        berry,
        stoneFruit,
        herbal,
        floral,
        earthy,
        grassy,
        vegetal,
        woody,
        spicy,
      }).map(([aroma, value]) => ({ aroma, value })),
  );
}
export type HopSensoryChartProps = {
  src?: ExtendedHop | null;
  data: HopSensoryChartData;
};
export function HopSensoryChart({ src, data: d }: HopSensoryChartProps) {
  //const data = makeChartData(src!);
  const data = Object.entries(d).map(([aroma, value]) => ({ aroma, value }));

  return (
    <Card>
      <CardHeader className="items-center pb-4">
        <CardTitle>Sensory Chart</CardTitle>
        <CardDescription>Perceived Hop Aromas.</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[450px]"
        >
          <RadarChart data={data}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="aroma" tickLine={true} tickCount={6} />
            <PolarGrid />
            <Radar
              dataKey="value"
              fill="var(--color-value)"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">Legend?</CardFooter>
    </Card>
  );
}
export default HopSensoryChart;
