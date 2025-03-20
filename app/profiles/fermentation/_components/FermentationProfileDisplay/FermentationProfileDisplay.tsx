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
      <div className="grid md:grid-cols-2">
        <Section title="Steps" className="lg:m-4  ">
          <ol className="list-decimal list-outside pl-6">
            {(src?.steps ?? []).map((step, index) => (
              <li
                key={step.id}
                className="list-item leading-4 py-2 px-1 hover:bg-slate-200 "
              >
                <FermentationStepListItem src={step} index={index} />
              </li>
            ))}
          </ol>
        </Section>
        <Section title="Graph" className="lg:m-4  ">
          <Suspense fallback={<ChartLine />}>
            <FermentationChart src={src} />
          </Suspense>
        </Section>
      </div>
    </div>
  );
}
