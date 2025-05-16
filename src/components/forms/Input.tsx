import React, { useState } from "react";

interface InputProps {
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
}

const Input: React.FC<InputProps> = ({
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
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div>
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
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(value !== "")}
          className="block py-2 md:py-3 rounded-lg md:rounded-xl pl-2 md:pl-4 w-full text-sm text-gray-900 border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border focus:border-blue-600 peer hover:border-gray-400"
          placeholder={placeholder}
          required={required}
        />
      </div>
      {error && (
        <p className="text-xs-sm text-red-500 first-letter:capitalize">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
