import { AppBarLayout } from "@/components/AppBarLayout";
import AppBarTitle from "@/components/AppBarTitle";
import { Hop } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Loading() {
  return (
    <AppBarLayout title={<AppBarTitle icon={<Hop />}>Hops</AppBarTitle>}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Alpha</TableHead>
            <TableHead>Beta</TableHead>
            <TableHead>Usage</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={7} className="h-24 text-center">
              Loading Hops.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </AppBarLayout>
  );
}
