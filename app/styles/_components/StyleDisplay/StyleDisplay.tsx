import { AppBar } from "@/components/AppBar";
import type { Style } from "@prisma/client";
import React from "react";
export interface StyleDisplayProps {
  style?: Style | null;
}
const actions = [{ text: "Edit", url: "edit" }];
export function StyleDisplay({ style }: StyleDisplayProps) {
  return (
    <div className="relative ">
      <div className="fixed bg-white h-16 w-full z-20">
        <AppBar
          title={`Style: ${style?.identifier} : ${style?.name}`}
          actions={actions}
        />
      </div>
      <div className="grid grid-flow-row mt-16 w-full ">
        {Object.entries(style || {}).map(([key, value]) => (
          <div key={key} className="grid grid-flow-col">
            <span>{key}</span>
            <span>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StyleDisplay;
