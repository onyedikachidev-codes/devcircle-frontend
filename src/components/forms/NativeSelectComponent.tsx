import React, { useState } from "react";

interface NativeSelectProps {
  id: string;
  label?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  otherClasses?: any;
  error?: string;
  placeholder?: string;
  required?: boolean;
  options: { value: string; label: string }[];
  limitWidth?: boolean;
}

const NativeSelect: React.FC<NativeSelectProps> = ({
  id,
  label,
  value,
  onChange,
  otherClasses,
  error,
  required,
  placeholder,
  options,
  limitWidth,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      <div className={`relative z-0 ${limitWidth ? "w-36" : "w-full"} group`}>
        {label && (
          <label
            htmlFor={id}
            className="text-sm mb-1 text-gray-600 inline-block"
          >
            {label}
            {required && (
              <span className="text-red-500" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}
        <div className="relative">
          <select
            {...(otherClasses || {})}
            name={id}
            id={id}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(value !== "")}
            className="block py-2 md:py-3 rounded-lg md:rounded-xl pl-2 md:pl-4 pr-6 md:pr-10 w-full text-sm text-gray-900 border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border focus:border-blue-600 peer hover:border-gray-400 capitalize"
            placeholder={placeholder}
            required={required}
          >
            <option value="">{placeholder || "Select an option"}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-1 md:pr-3">
            <svg
              className="w-4 h-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default NativeSelect;
