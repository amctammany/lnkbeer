import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function lowerFirst(str: string) {
  return str[0].toLowerCase() + str.slice(1);
}
