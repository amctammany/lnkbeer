import { Table } from "@tanstack/react-table";
import { Input } from "../Form/Input";
import { FieldValues } from "react-hook-form";
import { TextField } from "../Form/TextField";

export type FilterInputProps<T = any> = {
  table: T extends Table<infer R> ? R : T;
  //table: any;
  name: any; //keyof T;
};
export function FilterInput({ table, name }: FilterInputProps) {
  console.log({ table, name });
  return (
    <div className="">
      <TextField
        className="flex-grow bg-white"
        label={name}
        placeholder="Search"
        value={(table.getColumn(name)?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn(name)?.setFilterValue(event.target.value)
        }
        //className="max-w-sm"
      />
      {name}
    </div>
  );
}

FilterInput.defaultProps = {};

FilterInput.propTypes = {};

export default FilterInput;
