import React, { useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  name: string;
  options: Option[];
  placeholder?: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  name,
  options,
  placeholder,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const toggleOption = (value: string) => {
    setSelectedOptions((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  return (
    <div className="relative">
      <select
        name={name}
        multiple
        value={selectedOptions}
        onChange={(e) =>
          setSelectedOptions(
            Array.from(e.target.selectedOptions, (option) => option.value),
          )
        }
        className="hidden"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="flex min-h-[38px] flex-wrap gap-1 rounded-md border p-2">
        {selectedOptions.length === 0 && (
          <span className="text-gray-400">{placeholder}</span>
        )}
        {selectedOptions.map((value) => (
          <span
            key={value}
            className="rounded-md bg-blue-100 px-2 py-1 text-sm text-blue-800"
          >
            {options.find((o) => o.value === value)?.label}
          </span>
        ))}
      </div>
      <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-white shadow-lg">
        {options.map((option) => (
          <div
            key={option.value}
            className={`cursor-pointer p-2 hover:bg-gray-100 ${
              selectedOptions.includes(option.value) ? "bg-blue-50" : ""
            }`}
            onClick={() => toggleOption(option.value)}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};
