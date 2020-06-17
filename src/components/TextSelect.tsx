import React from "react";

interface Props {
  value: string;
  options: string[];
  onChange(e: React.ChangeEvent<HTMLSelectElement>): void;
  style?: React.CSSProperties;
  values?: string[];
}

export default ({ value, options, onChange, style, values }: Props) => (
  <select
    value={value}
    onChange={onChange}
    style={{ ...style, borderWidth: 0, fontSize: 20, width: "auto" }}
  >
    {options.map((option: any, index: number) => (
      <option key={option} value={values ? values[index] : option}>
        {option}
      </option>
    ))}
  </select>
);
