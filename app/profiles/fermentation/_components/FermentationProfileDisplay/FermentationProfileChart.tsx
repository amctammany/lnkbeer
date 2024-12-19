"use client";
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
import { ExtendedFermentationProfile } from "@/types/Profile";
import { TrendingUp } from "lucide-react";
import { LineChart, CartesianGrid, XAxis, Line, YAxis } from "recharts";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;
function generateChartData(src: ExtendedFermentationProfile) {
  const res = src.steps.reduce((acc, step) => {
    const stepData = Array.from({ length: step.time }, (_, index) => ({
      day: index + acc.length,
      temperature: step.temperature,
    }));
    return acc.concat(...stepData);
  }, [] as any[]);
  return res;
}
export type FermentationProfileChartProps = {
  src?: ExtendedFermentationProfile | null;
};
export function FermentationProfileChart({
  src,
}: FermentationProfileChartProps) {
  const data = generateChartData(src!);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{src?.name}</CardTitle>
        <CardDescription>{src?.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <YAxis dataKey="temperature" label="Temperature" />
            <XAxis
              dataKey="day"
              //tickLine={false}
              //axisLine={false}
              label="Duration (day)"
              tickMargin={8}
              //tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="temperature"
              type="linear"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter>
    </Card>
  );
}
export default FermentationProfileChart;
