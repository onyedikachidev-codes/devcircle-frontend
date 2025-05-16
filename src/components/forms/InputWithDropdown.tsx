import React, { useState, useEffect, useRef } from "react";
import { Option } from "@/common/constants";

interface InputWithDropdown {
  id?: string;
  label?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  otherClasses?: any;
  error?: string;
  icon?: any;
  placeholder?: string;
  required?: boolean;
  options?: Option[];
  setValue?: any;
}

const InputWithDropdown: React.FC<InputWithDropdown> = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  required,
  otherClasses,
  placeholder,
  icon,
  options = [],
  setValue,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      const lowercasedValue = value.toLowerCase();
      setFilteredOptions(
        options.filter((option) =>
          option.label.toLowerCase().includes(lowercasedValue)
        )
      );
    } else {
      setFilteredOptions(options);
    }
  }, [value, options]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={inputRef} className="relative">
      <div className="relative z-0 w-full group">
        {label && (
          <label
            htmlFor={id}
            className="text-sm mb-1 text-gray-600 inline-block"
          >
            {icon}
            <span>{label}</span>
            {required && (
              <span className="text-red-500" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}
        <input
          {...otherClasses}
          type={type}
          name={id}
          id={id}
          value={value}
          onChange={(e) => {
            setValue(id, e.target.value);
          }}
          onFocus={() => setIsFocused(true)}
          className="block py-2 md:py-3 rounded-lg md:rounded-xl pl-2 md:pl-4 w-full text-sm text-gray-900 border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border focus:border-blue-600 peer hover:border-gray-400"
          placeholder={placeholder}
          required={required}
        />
      </div>

      {isFocused && (
        <div className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-blue-100"
                onClick={() => {
                  setValue!(id, option.value);
                  setIsFocused(false);
                }}
              >
                {option.label}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-sm text-gray-500">
              No matches found
            </div>
          )}
        </div>
      )}

      {error && (
        <p className="text-xs-sm text-red-500 first-letter:capitalize">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputWithDropdown;
