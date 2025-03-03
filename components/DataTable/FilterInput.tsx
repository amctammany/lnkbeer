import { Table } from "@tanstack/react-table";
import { Input } from "../Form/Input";
import { FieldValues } from "react-hook-form";
import { TextField } from "../Form/TextField";
import { DebouncedInput } from "../Form/DebouncedInput";

export type FilterInputProps<T = any> = {
  //table: T extends Table<infer R> ? R : T;
  onChange?: any;
  value?: any;
  name: any; //keyof T;
};
export function FilterInput({ value, onChange, name }: FilterInputProps) {
  return (
    <div className="">
      <DebouncedInput
        className="grow "
        label={name}
        name={name}
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
