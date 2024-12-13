import { ChangeEventHandler, useCallback, useEffect, useState } from "react";
import { TextField, TextFieldProps } from "./TextField";

export type DebouncedInputProps = {
  value: string | number;
  onChange: (name: string | undefined, value: string | number) => void;
  debounce?: number;
} & TextFieldProps; // Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">;
export function DebouncedInput({
  value: initialValue,
  onChange,
  name,
  debounce = 500,
  ...props
}: DebouncedInputProps) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(name, value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value, onChange, name, debounce]);
  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => setValue(e.target.value),
    [setValue],
  );

  return (
    <TextField {...props} name={name} value={value} onChange={handleChange} />
  );
}
