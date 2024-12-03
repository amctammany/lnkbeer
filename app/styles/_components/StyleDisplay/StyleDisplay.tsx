import { AppBarLayout } from "@/components/AppBarLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Style } from "@prisma/client";
import React from "react";
export interface StyleDisplayProps {
  style?: Style | null;
}
const actions = [{ text: "Edit", url: "edit" }];
export function StyleDisplay({ style }: StyleDisplayProps) {
  return (
    <AppBarLayout
      title={`Style: ${style?.identifier} : ${style?.name}`}
      actions={actions}
    >
      <Card className="m-8">
        <CardHeader>
          <span>{`Style: ${style?.identifier} : ${style?.name}`}</span>
        </CardHeader>
        <CardContent>
          {Object.entries(style || {}).map(([key, value]) => (
            <div key={key} className="flex border-2 mb-1">
              <span className="bg-slate-200 px-2">{key}</span>
              <span className="flex-grow px-2">{value}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppBarLayout>
  );
}

export default StyleDisplay;
