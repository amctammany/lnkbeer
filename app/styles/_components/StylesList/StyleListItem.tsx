import { Style } from "@prisma/client";
import React from "react";
export type StyleListItemProps = {
  style: Style;
};

function StyleListItem({ style }: StyleListItemProps) {
  return <div className="">{JSON.stringify(style)}</div>;
}

export default StyleListItem;
