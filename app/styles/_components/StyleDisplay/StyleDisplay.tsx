import { AppBarAction } from "@/components/AppBar";
import { AppBarLayout } from "@/components/AppBarLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Style } from "@prisma/client";
import { Edit } from "lucide-react";
import React from "react";
export interface StyleDisplayProps {
  style?: Style | null;
}
const makeActions = (style: Style | undefined | null) => [
  { text: "Edit", url: `/styles/${style?.slug}/edit` },
];
const StyleDisplayActions = ({ style }: StyleDisplayProps) => {
  return [
    <AppBarAction
      key="edit"
      text="Edit"
      icon={<Edit />}
      url={`/styles/${style?.slug}/edit`}
    />,
  ];
};
export function StyleDisplay({ style }: StyleDisplayProps) {
  return (
    <AppBarLayout
      title={`Style: ${style?.identifier} : ${style?.name}`}
      actions={<StyleDisplayActions style={style} />}
    >
      <div className="p-10">
        {Object.entries(style || {}).map(([key, value]) => (
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
