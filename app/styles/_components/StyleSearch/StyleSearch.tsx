import { Style } from "@prisma/client";
import React from "react";
export type StyleSearchProps = {
  style: Style;
};

export function StyleSearch({ style }: StyleSearchProps) {
  return <div className="">{JSON.stringify(style)}</div>;
}

export default StyleSearch;
