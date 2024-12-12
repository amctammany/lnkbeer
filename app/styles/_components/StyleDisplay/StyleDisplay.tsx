import { AppBarItem } from "@/components/AppBarItem";
import { AppBarLayout } from "@/components/AppBarLayout";
import { Prop } from "@/components/Prop";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Style } from "@prisma/client";
import { Edit } from "lucide-react";
import Link from "next/link";
import React from "react";
export interface StyleDisplayProps {
  src?: Style | null;
}
const makeActions = (style: Style | undefined | null) => [
  { text: "Edit", url: `/styles/${style?.slug}/edit` },
];
const StyleDisplayActions = ({ src }: StyleDisplayProps) => {
  return [
    <AppBarItem
      key="edit"
      text="Edit"
      icon={<Edit />}
      url={`/styles/${src?.slug}/edit`}
    />,
  ];
};
export function StyleDisplay({ src }: StyleDisplayProps) {
  return (
    <AppBarLayout
      title={`Style: ${src?.identifier} : ${src?.name}`}
      actions={<StyleDisplayActions src={src} />}
    >
      <div className="p-10">
        <Card className="m-4 *:border-b-2 last-of-type:*:border-b-0 ">
          <Prop label="Name" value={src?.name} />
          <Prop label="Overall" value={src?.overall} />
          <Prop label="Aroma" value={src?.aroma} />
          <Prop label="Appearance" value={src?.appearance} />
          <Prop label="Mouthfeel" value={src?.mouthfeel} />
          <Prop label="Flavor" value={src?.flavor} />
          <Prop label="Comments" value={src?.comments} />
          <Prop label="History" value={src?.history} />
          <Prop label="Ingredients" value={src?.ingredients} />
          <Prop label="Comparision" value={src?.comparison} />
          <Prop label="Examples" value={src?.examples} />
          <Prop label="Ingredients" value={src?.ingredients} />
        </Card>
        {Object.entries(src || {}).map(([key, value]) => (
          <div key={key} className="flex border-2 mb-1">
            <span className="bg-slate-200 px-2">{key}</span>
            <span className="flex-grow px-2">{value}</span>
          </div>
        ))}
      </div>
    </AppBarLayout>
  );
}

export default StyleDisplay;
