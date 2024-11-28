import { Style } from "@prisma/client";
import React from "react";
export type StylesListProps = {
  styles: Style[];
};

export function StylesList({ styles }: StylesListProps) {
  return <div className="">{JSON.stringify(styles)}</div>;
}

export default StylesList;
