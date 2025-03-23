import type { Style } from "@prisma/client";
export interface StyleSearchProps {
  style: Style;
}

export function StyleSearch({ style }: StyleSearchProps) {
  return <div className="">{JSON.stringify(style)}</div>;
}

export default StyleSearch;
