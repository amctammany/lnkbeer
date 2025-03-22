"use client";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
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

export type SensoryHopChartProps = {
  data: any;
};
export const SensoryHopChart = ({ data }: SensoryHopChartProps) => {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[450px]"
    >
      <RadarChart data={data}>
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
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
  );
};
export default SensoryHopChart;
