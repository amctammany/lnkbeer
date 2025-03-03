"use client";
import { Button } from "@/components/ui/button";
import { HeaderContext, RowData } from "@tanstack/react-table";
import { ArrowUp, ArrowDown } from "lucide-react";
//type Header<T, D> = (props: Header<T, D>) => any; //Exclude<ColumnDefTemplate<HeaderContext<T, D>>, string>;

export const Header = <T extends RowData = unknown, V = unknown>({
  column,
}: HeaderContext<T, V>): any => {
  const Comp = column.getIsSorted() === "desc" ? ArrowUp : ArrowDown;
  return (
    <Button
      variant="ghost"
      className="w-full text-left flex"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      <span className="capitalize grow">{column.id}</span>
      {column.getIsSorted() && <Comp className="ml-2 h-4 w-4" />}
    </Button>
  );
};
