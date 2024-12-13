import { ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Input } from "../ui/input";
import { useReactTable } from "@tanstack/react-table";

export type TableSearchProps<T> = {
  table: ReturnType<typeof useReactTable<T>>;
  children?: React.ReactNode | React.ReactNode[];
};
export function TableSearch<T>({ table, children }: TableSearchProps<T>) {
  return (
    <Collapsible className="group/collapsible">
      <div className="flex items-center px-2 py-4 ">
        <Input
          className="flex-grow bg-white"
          name="globalSearch"
          type="search"
          placeholder="Search"
          value={(table.getState().globalFilter as string) ?? ""}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          //className="max-w-sm"
        />
        <CollapsibleTrigger asChild>
          <Button variant="secondary" className="mx-2">
            Advanced
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>{children} </CollapsibleContent>
    </Collapsible>
  );
}

export default TableSearch;
