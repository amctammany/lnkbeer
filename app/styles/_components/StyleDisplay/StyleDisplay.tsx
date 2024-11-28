import { AppBar } from "@/components/AppBar";
import type { Style } from "@prisma/client";
import React from "react";
export interface StyleDisplayProps {
  style?: Style | null;
}
const actions = [{ text: "Edit", url: "edit" }];
export function StyleDisplay({ style }: StyleDisplayProps) {
  return (
    <div className="">
      <AppBar
        title={`Style: ${style?.identifier} : ${style?.name}`}
        actions={actions}
      />
      {JSON.stringify(style)}
    </div>
  );
}

export default StyleDisplay;
