import { Select } from "../Form/Select";

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
  return (
    <div className="">
      <Select
        className="flex-grow bg-white"
        label={name}
        name={name}
        value={value}
        options={options}
        onChange={onChange}
        //className="max-w-sm"
      />
    </div>
  );
}

export default FilterSelect;
