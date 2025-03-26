"use client";
import type { Hop as HopType } from "@prisma/client";

export type HopDisplayProps = {
  //slug: string;
  user?: User;
  hop: HopType;
};
//import { Range } from "@/components/Range";
//import { HopInput } from "@/types/ingredient";
const SummaryTab = dynamic(
  () => import("../../_components/HopDisplay/SummaryTab")
);
const CompositionTab = dynamic(
  () => import("../../_components/HopDisplay/CompositionTab"),
  { ssr: false }
);
const SensoryTab = dynamic(
  () => import("../../_components/HopDisplay/SensoryTab"),
  { ssr: false }
);

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { User } from "next-auth";

export function HopDisplay({ hop, user }: HopDisplayProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleChange = (value) => {
    router.push(`/ingredients/hops/${hop.slug}?tab=${value}`);
  };
  return (
    <Tabs
      className="*:not-first:max-w-10/12 *:not-first:mx-auto"
      defaultValue={searchParams.get("tab") ?? "summary"}
      onValueChange={handleChange}
    >
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="summary">Summary</TabsTrigger>
        <TabsTrigger value="composition">Composition</TabsTrigger>
        <TabsTrigger value="sensory">Sensory</TabsTrigger>
      </TabsList>
      <TabsContent value="summary">
        <SummaryTab src={hop} />
      </TabsContent>
      <TabsContent value="composition">
        <CompositionTab src={hop} />
      </TabsContent>

      <TabsContent value="sensory">
        <SensoryTab src={hop} user={user} />
      </TabsContent>
    </Tabs>
  );
}
/**(
    <AppBarLayout
      title={<AppBarTitle icon={<Hop />}>{hop?.name}</AppBarTitle>}
      actions={<HopDisplayActions slug={hop.slug} />}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <Card className="m-4  *:border-b-2 *:last-of-type:border-b-0 ">
          <Prop label="Name" value={hop?.name} />
          <Prop label="Country" value={hop?.country} />
          <Prop label="Usage" value={hop?.usage} />
          <Prop label="Characteristics" value={hop?.characteristics} />
          <Prop label="Alpha" value={hop?.alpha} />
          <Prop label="Beta" value={hop?.beta} />
        </Card>
        <Card className="m-4  *:border-b-2 *:last-of-type:border-b-0 ">
          <div className="m-2">
            {rangeProps(hop!).map((props) => (
              <Range key={props.name} label={props.name} {...props} />
            ))}
          </div>
        </Card>
      </div>
    </AppBarLayout>
  )*/
export default HopDisplay;
