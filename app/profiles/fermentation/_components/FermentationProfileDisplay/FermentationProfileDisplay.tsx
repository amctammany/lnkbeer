"use client";
import { Prop } from "@/components/Prop";
import Section from "@/components/Section";
import { ExtendedFermentationProfile } from "@/types/Profile";
import Link from "next/link";
import { FermentationStepListItem } from "../FermentationProfileForm/FermentationStepListItem";
import { Card } from "@/components/ui/card";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { ChartLine } from "lucide-react";
import { List } from "@/components/List/List";
const FermentationChart = dynamic(() => import("./FermentationProfileChart"), {
  ssr: false,
});
export type FermentationProfileDisplayProps = {
  src?: ExtendedFermentationProfile | null;
};

export function FermentationProfileDisplay({
  src,
}: FermentationProfileDisplayProps) {
  return (
    <div className="lg:p-2">
      <Card className="m-1 lg:m-4 *:border-b-2 *:last-of-type:border-b-0 ">
        <Prop label="Name" value={src?.name} />
        <Prop
          label="Forked From"
          value={
            <Link
              className="underline"
              href={`/profiles/fermentation/${src?.origin?.slug}`}
            >
              {src?.origin?.name}
            </Link>
          }
        />
        <Prop label="Forks" value={src?.forks.length} />
        <Prop label="Description" value={src?.description} />
      </Card>
      <div className="grid lg:grid-cols-2">
        <Section title="Steps" className="lg:m-2  ">
          <List className="">
            {(src?.steps ?? []).map((step, index) => (
              <FermentationStepListItem
                src={step}
                index={index}
                key={step.id}
                //className="list-item hover:bg-slate-200 "
              />
            ))}
          </List>
        </Section>
        <Section title="Graph" className="lg:m-2  ">
          <Suspense fallback={<ChartLine />}>
            <FermentationChart src={src} />
          </Suspense>
        </Section>
      </div>
    </div>
  );
}
