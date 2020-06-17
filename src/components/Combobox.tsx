import React from "react";

interface Props {
  options: string[];
  onChanged(value: string, selectedIndex: number): void;
  style: any;
  value?: string;
  [key: string]: any;
}

const Combobox = ({ options, onChanged, style, value, ...props }: Props) => {
  return (
    <select
      style={{
        border: "1px solid black",
        backgroundColor: "#181818",
        color: "white",
        fontSize: 20,
        height: 40,
        ...style,
      }}
      onChange={(e) => onChanged(e.target.value, e.target.selectedIndex)}
      value={value}
    >
      {options.map((option: string) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Combobox;
