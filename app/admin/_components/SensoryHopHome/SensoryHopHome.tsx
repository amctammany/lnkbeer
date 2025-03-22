"use client";
//import { HopSensoryChart } from "@/app/ingredients/hops/_components/HopSensoryChart";
import { AppBarItem } from "@/components/AppBarItem";
import { AppBarLayout } from "@/components/AppBarLayout";
import { List } from "@/components/List/List";
import { ListItem } from "@/components/List/ListItem";
import { ListItemText } from "@/components/List/ListItemText";
//import { Prop } from "@/components/Prop";
import Section from "@/components/Section";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ExtendedHopNote } from "@/types/ingredient";
import type { Hop as HopType } from "@prisma/client";
import { Plus } from "lucide-react";
import dynamic from "next/dynamic";
const SensoryHopChart = dynamic(
  () => import("../SensoryHopDisplay/SensoryHopChart"),
  {
    ssr: false,
  },
);

export interface SensoryHopHomeProps {
  hop?: HopType | null;
  notes: ExtendedHopNote[];
  //user?: ExtendedUser | null;
  //panel: HopSensoryPanel; // Pick<HopSensoryPanel, "id" | "hopId" | "year">[];
  //action?: any;
  //children: React.ReactNode;
}

export const SensoryHopHome = ({ hop, notes }: SensoryHopHomeProps) => {
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
  } = notes[0]?.sensoryPanel ?? {};
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
    onionGarlic,
    driedFruit,
  }).map(([aroma, value]) => ({ aroma, value: value ?? 0 }));
  //.reduce((acc, g) => {
  //acc[g.aroma] = g.value ?? 0;
  //return acc;
  //}, {});
  return (
    <AppBarLayout title="SensoryHopHome">
      <div className="mx-auto lg:w-10/12 flex flex-col md:grid md:grid-cols-2 gap-0">
        <Section
          title="Hop Notes"
          actions={
            <AppBarItem
              url={`/admin/sensory/hops/${hop?.slug}/new`}
              icon={<Plus />}
              text="New"
            />
          }
        >
          <List>
            {notes.map((note) => (
              <ListItem
                href={`/admin/sensory/hops/${hop?.slug}/${note.uid}`}
                key={note.uid}
              >
                <ListItemText
                  primary={`Producer: ${note.producer}; Year: ${note.year}`}
                  secondary={note.date.toString()}
                />
              </ListItem>
            ))}
          </List>
        </Section>
        <Section title="Sensory">
          <Card>
            <CardHeader className="items-center pb-4">
              <CardTitle>Sensory Chart</CardTitle>
              <CardDescription>Perceived Hop Aromas.</CardDescription>
            </CardHeader>
            <CardContent className="pb-0">
              <SensoryHopChart data={data} />
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
              Legend Controls??
            </CardFooter>
          </Card>
        </Section>
      </div>
    </AppBarLayout>
  );
};
export default SensoryHopHome;
