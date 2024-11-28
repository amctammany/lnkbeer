import { Style } from "@prisma/client";
import React from "react";
export type StyleDisplayProps = {
  style?: Style | null;
};

export function StyleDisplay({ style }: StyleDisplayProps) {
  return <div className="">{JSON.stringify(style)}</div>;
}

export default StyleDisplay;
