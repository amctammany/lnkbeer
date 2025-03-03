import { Input } from "@/components/Form/Input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export type TableSkeletonProps = {
  headers?: string[];
  children?: React.ReactNode | React.ReactNode[];
};
export function TableSkeleton({
  headers = [],
  children = "Loading",
}: TableSkeletonProps) {
  return (
    <>
      <div className="flex items-center px-2 py-4 ">
        <Input
          className="grow bg-white"
          name="globalSearch"
          type="search"
          placeholder="Search"
          //className="max-w-sm"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            {headers.map((header) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell
              colSpan={headers.length + 2}
              className="h-24 text-center"
            >
              {children}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}
