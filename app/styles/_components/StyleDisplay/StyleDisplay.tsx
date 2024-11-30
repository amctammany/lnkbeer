import { AppBar } from "@/components/AppBar";
import { AppBarLayout } from "@/components/AppBarLayout";
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
      {Object.entries(style || {}).map(([key, value]) => (
        <div key={key} className="grid grid-flow-col">
          <span>{key}</span>
          <span>{value}</span>
        </div>
      ))}
    </AppBarLayout>
  );
}

export default StyleDisplay;
