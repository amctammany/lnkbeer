import { Table } from "@tanstack/react-table";
import { Input } from "../Form/Input";
import { FieldValues } from "react-hook-form";
import { TextField } from "../Form/TextField";

export type FilterInputProps<T = any> = {
  //table: T extends Table<infer R> ? R : T;
  onChange?: any;
  value?: any;
  name: any; //keyof T;
};
export function FilterInput({ value, onChange, name }: FilterInputProps) {
  return (
    <div className="">
      <TextField
        className="flex-grow bg-white"
        label={name}
        placeholder="Search"
        value={value}
        onChange={onChange}
        //className="max-w-sm"
      />
    </div>
  );
}

FilterInput.defaultProps = {};

FilterInput.propTypes = {};

export default FilterInput;
