import type { Style } from "@prisma/client";
import React from "react";
export interface StyleListItemProps {
  style: Style;
}

function StyleListItem({ style }: StyleListItemProps) {
  return <div className="">{JSON.stringify(style)}</div>;
}

export default StyleListItem;
