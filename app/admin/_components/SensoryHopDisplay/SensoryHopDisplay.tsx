"use client";
import { AppBarItem } from "@/components/AppBarItem";
import { AppBarLayout } from "@/components/AppBarLayout";
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
import { ExtendedHopNote } from "@/types/ingredient";
import type { Hop as HopType } from "@prisma/client";
import { Edit } from "lucide-react";
import { Radar, RadarChart, PolarAngleAxis, PolarGrid } from "recharts";

export interface SensoryHopDisplayProps {
  hop: HopType;
  note: ExtendedHopNote;
  //user?: ExtendedUser | null;
  //panel: HopSensoryPanel; // Pick<HopSensoryPanel, "id" | "hopId" | "year">[];
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

export const SensoryHopDisplay = ({ hop, note }: SensoryHopDisplayProps) => {
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
  } = note.sensoryPanel ?? {};
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
    onionGarlic,
    driedFruit,
    woody,
    spicy,
  }).map(([aroma, value]) => ({ aroma, value: value ?? 0 }));
  //.reduce((acc, g) => {
  //acc[g.aroma] = g.value ?? 0;
  //return acc;
  //}, {});
  return (
    <AppBarLayout
      title="Hop Sensory Editor"
      actions={[
        <AppBarItem
          icon={<Edit />}
          text="Edit"
          url={`/admin/sensory/hops/${hop.slug}/${note.uid}/edit`}
          key="save"
        />,
      ]}
    >
      <div className="mx-auto lg:w-10/12 flex flex-col md:grid md:grid-cols-2 gap-0">
        <Section title="Summary">
          <Prop label="Hop" value={hop.name} />
          <Prop label="Date" value={note.date.toDateString()} />
          <Prop label="Producer" value={note.producer} />
          <Prop label="Year" value={note.year} />
        </Section>

        <Section title="Sensory">
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
                  <PolarAngleAxis
                    dataKey="aroma"
                    tickLine={true}
                    tickCount={6}
                  />
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
              <span className="text-xl">Aroma Profile:</span>
              <div className="flex">
                {note.sensoryPanel?.aromas.map((aroma) => (
                  <div
                    className="px-2 py-1 mx-2 border-2 border-blue rounded"
                    key={aroma.id}
                  >
                    {aroma.name}
                  </div>
                ))}
              </div>
            </CardFooter>
          </Card>
        </Section>
      </div>
    </AppBarLayout>
  );
};
export default SensoryHopDisplay;
