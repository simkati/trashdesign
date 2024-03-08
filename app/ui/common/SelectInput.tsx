type SelectInputProp = {
  options: { label: string; value: string }[];
  label: string;
  name: string;
};

export default function SelectInput({ options, label, name }: SelectInputProp) {
  return (
    <label className="my-2">
      {label}:
      <select className="ml-3 px-3 py-2" name={name}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
