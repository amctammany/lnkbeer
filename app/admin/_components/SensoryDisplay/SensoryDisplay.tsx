"use client";
import { aromaGroups } from "@/app/ingredients/hops/_components/HopSensory";
import { HopSensoryChart } from "@/app/ingredients/hops/_components/HopSensoryChart";
import { AppBarItem } from "@/components/AppBarItem";
import { Prop } from "@/components/Prop";
import Section from "@/components/Section";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { HopSensoryChartData } from "@/types/ingredient";
import type { HopSensoryPanel, User } from "@prisma/client";
import { SquareArrowOutUpRight } from "lucide-react";
import { Radar, RadarChart, PolarAngleAxis, PolarGrid, Legend } from "recharts";

export interface SensoryDisplayProps {
  //user?: ExtendedUser | null;
  panel: HopSensoryPanel; // Pick<HopSensoryPanel, "id" | "hopId" | "year">[];
  //action?: any;
  //children: React.ReactNode;
}

const chartConfig = {
  user: {
    label: "User",
    color: "hsl(var(--chart-1))",
  },

  expert: {
    label: "Expert",
    color: "hsl(var(--chart-2))",
  },
  avg: {
    label: "Average",
    color: "hsl(var(--chart-4))",
  },
  value: {
    label: "Value",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export const SensoryDisplay = ({ panel }: SensoryDisplayProps) => {
  const {
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
    onionGarlic,
    //offFlavors,
    driedFruit,
  } = panel;
  const _data = {
    sweetAromatic,
    pomme,
    citrus,
    melon,
    dank,
    tropical,
    berry,
    stoneFruit,
    herbal,
    onionGarlic,
    //offFlavors,
    driedFruit,
    floral,
    earthy,
    grassy,
    vegetal,
    woody,
    spicy,
  };
  const data = Object.entries({
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
  }).map(([aroma, value]) => ({ aroma, value: value ?? 0 }));
  //.reduce((acc, g) => {
  //acc[g.aroma] = g.value ?? 0;
  //return acc;
  //}, {});
  function addToChartData(root: HopSensoryChartData, src: HopSensoryPanel) {
    return aromaGroups.reduce((acc, g) => {
      acc[g] = src[g] ?? 0;
      return acc;
    }, root);
  }
  console.log(data);
  return (
    <div className="mx-auto lg:w-10/12 flex flex-col gap-0">
      <Section
        title="Sensory Display"
        actions={
          <AppBarItem
            url="/admin/sensory"
            icon={<SquareArrowOutUpRight />}
            text="Go"
          />
        }
      >
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
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <PolarAngleAxis dataKey="aroma" tickLine={true} tickCount={6} />
                <PolarGrid />
                <Radar
                  className=""
                  name="Global Avg"
                  dataKey="value"
                  fill="var(--color-value)"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm">
            Legend Controls??
          </CardFooter>
        </Card>

        {JSON.stringify(panel)}
      </Section>
    </div>
  );
};
export default SensoryDisplay;
/**
 *
 *           */
