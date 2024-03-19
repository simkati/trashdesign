import { ChangeEvent } from "react";

type SelectInputProp = {
  options: { label: string; value: string }[];
  label: string;
  name: string;
  defaultValue: string;
  className?: string;
};

type SelectInputSearchProp = {
  options: { label: string; value: string }[];
  label: string;
  name: string;
  emptyField?: boolean;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

export default function SelectInput({
  options,
  label,
  name,
  defaultValue,
  className,
}: SelectInputProp) {
  return (
    <label className={`${className} my-2`}>
      {label}:
      <select
        className="ml-3 px-3 py-2"
        name={name}
        defaultValue={defaultValue}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function SelectInputSearch({
  options,
  label,
  name,
  emptyField,
  onChange,
}: SelectInputSearchProp) {
  return (
    <label className="my-2 ml-3">
      {label}:
      <select
        className="ml-3 px-3 py-2"
        name={name}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e)}
      >
        {emptyField && <option value="" />}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
