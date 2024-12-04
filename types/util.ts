import { RangeValue } from "./ingredient";

export type NumberKeys<T extends object> = {
  [K in keyof T]: NonNullable<T[K]> extends number ? K : never;
}[keyof T];
export type RangeKeys<T extends object> = {
  [K in keyof T]: NonNullable<T[K]> extends RangeValue ? K : never;
}[keyof T];
