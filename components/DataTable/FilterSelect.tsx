import { ChangeEventHandler, useCallback } from "react";
import { Select } from "../Form/Select";

//eslint-disable-next-line
export type FilterSelectProps<T = any> = {
  //table: T extends Table<infer R> ? R : T;
  onChange?: any;
  value?: any;
  name: any; //keyof T;
  options?: any;
};
export function FilterSelect({
  value,
  onChange,
  options = {},
  name,
}: FilterSelectProps) {
  const handleChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(
    (e) => onChange(name, e.target.value),
    [onChange, name]
  );
  return (
    <div className="">
      <Select
        className="grow shadow-xs"
        label={name}
        name={name}
        value={value}
        options={options}
        onChange={handleChange}
        //className="max-w-sm"
      />
    </div>
  );
}

export default FilterSelect;
