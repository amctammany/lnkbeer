"use client";

import { Legend, PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

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
import { useState } from "react";

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
//function makeChartData(src: ExtendedHop) {
//return src?.hopSensoryPanels?.map(
//({
//sweetAromatic,
//pomme,
//citrus,
//melon,
//earthy,
//tropical,
//berry,
//stoneFruit,
//dank,
//herbal,
//floral,
//grassy,
//vegetal,
//woody,
//spicy,
//}) =>
//Object.entries({
//sweetAromatic,
//pomme,
//citrus,
//melon,
//dank,
//tropical,
//berry,
//stoneFruit,
//herbal,
//floral,
//earthy,
//grassy,
//vegetal,
//woody,
//spicy,
//}).map(([aroma, value]) => ({ aroma, value })),
//);
//}
export type HopSensoryChartProps = {
  src?: ExtendedHop | null;
  data: HopSensoryChartData;
};
export function HopSensoryChart({ data: _data }: HopSensoryChartProps) {
  //const data = makeChartData(src!);
  const data = Object.entries(_data).map(
    ([aroma, { value, avg, user, expert }]) => ({
      aroma,
      value,
      avg,
      user,
      expert,
    }),
  );
  const useUser = data.every(({ user }) => user !== undefined);
  const useAvg = data.every(({ avg }) => avg !== undefined);
  const useExpert = data.every(({ expert }) => expert !== undefined);

  const [showUser, setShowUser] = useState<boolean>(useUser);
  const [showAvg, setShowAvg] = useState<boolean>(useAvg);
  const [showExpert, setShowExpert] = useState<boolean>(useExpert);
  const handleClick = (index) => () => {
    if (index === 0) setShowAvg((old) => !old);
    if (index === 1) setShowUser((old) => !old);
    if (index === 2) setShowExpert((old) => !old);
  };
  const renderLegend = (props) => {
    const { payload } = props;
    const getChecked = (index) => {
      if (index === 0) return showAvg;
      if (index === 1) return showUser;
      if (index === 2) return showExpert;
      return false;
    };

    return (
      <ul className="">
        {payload.map((entry, index) => (
          <li
            key={`item-${index}`}
            className="mx-3 inline-flex border px-2 py-1"
          >
            <label htmlFor={`item-${index}`}>
              <input
                id={`item-${index}`}
                type="checkbox"
                name={"selectedData"}
                onChange={handleClick(index)}
                checked={getChecked(index)}
              />
              <span className={`grow px-2 `} style={{ color: entry.color }}>
                {entry.value}
              </span>
              <svg
                className="inline align-middle mr-1 recharts-surface"
                width="14"
                height="14"
                viewBox="0 0 32 32"
                //style="display: inline-block; vertical-align: middle; margin-right: 4px;"
              >
                <title></title>
                <desc></desc>
                <path
                  stroke="none"
                  fill={entry.color}
                  d="M0,4h32v24h-32z"
                  className="recharts-legend-icon"
                ></path>
              </svg>
            </label>
          </li>
        ))}
      </ul>
    );
  };

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
              className={showAvg ? "" : "hidden"}
              name="Global Avg"
              dataKey="avg"
              fill="var(--color-value)"
              fillOpacity={0.6}
            />
            <Radar
              className={showUser ? "" : "hidden"}
              name="User"
              dataKey="user"
              fill="var(--color-user)"
              fillOpacity={0.7}
            />
            <Radar
              className={showExpert ? "" : "hidden"}
              name="Expert"
              dataKey="expert"
              fill="var(--color-expert)"
              fillOpacity={0.7}
            />

            <Legend onClick={handleClick} content={renderLegend} />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        Legend Controls??
      </CardFooter>
    </Card>
  );
}
export default HopSensoryChart;
