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
import { LineChart, CartesianGrid, XAxis, Line, YAxis, Label } from "recharts";

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
    const prevTemp = acc.length === 0 ? 0 : acc[acc.length - 1].temperature;
    const mod = prevTemp < step.temperature ? 1 : -1;
    const rampData = Array.from({ length: step.rampTime }, (_, index) => ({
      day: index + acc.length,
      temperature: prevTemp + mod * (index / step.rampTime) * step.temperature,
    }));

    const stepData = Array.from({ length: step.time }, (_, index) => ({
      day: index + acc.length + step.rampTime,
      temperature: step.temperature,
    }));

    return acc.concat(...rampData, ...stepData);
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
              bottom: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <YAxis
              dataKey="temperature"
              label={{
                value: "Temperature",
                angle: -90,
                offet: 0,
                position: "insideLeft",
              }}
            />
            <XAxis
              dataKey="day"
              //tickLine={false}
              //axisLine={false}
              //tickMargin={8}

              //tickFormatter={(value) => value.slice(0, 3)}
            >
              <Label value="Duration" offset={-8} position="insideBottom" />
            </XAxis>
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
