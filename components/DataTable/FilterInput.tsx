import { DebouncedInput } from "../Form/DebouncedInput";

export type FilterInputProps<T = any> = {
  //table: T extends Table<infer R> ? R : T;
  onChange?: any;
  value?: T;
  name: any;
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
