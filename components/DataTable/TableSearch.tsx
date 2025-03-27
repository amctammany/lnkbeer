import { ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
//import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Input } from "../ui/input";
import { useReactTable } from "@tanstack/react-table";
import clsx from "clsx";

export type TableSearchProps<T> = {
  table: ReturnType<typeof useReactTable<T>>;
  children?: React.ReactNode | React.ReactNode[];
};
export function TableSearch<T>({ table, children }: TableSearchProps<T>) {
  "use no memo";
  return (
    <Collapsible className="group/collapsible">
      <div className="flex items-center px-2 py-4 ">
        <Input
          className="grow bg-white"
          name="globalSearch"
          type="search"
          placeholder="Search"
          value={(table.getState().globalFilter as string) ?? ""}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          //className="max-w-sm"
        />
        <CollapsibleTrigger
          asChild
          className={clsx("hidden", {
            "inline-flex": Array.isArray(children) && children.length > 0,
          })}
        >
          <Button variant="secondary" className="mx-2">
            Advanced
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="bg-slate-200/50">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}

export default TableSearch;
