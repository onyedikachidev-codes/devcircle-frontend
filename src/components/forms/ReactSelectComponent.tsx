import React from "react";

import Select, { components, MultiValueProps, OptionProps } from "react-select";
import { Option } from "@/common/constants";

const CustomMultiValue = (props: MultiValueProps<Option>) => {
  return (
    <components.MultiValue {...props}>
      <div
        className="flex items-center capitalize bg-transparent text-blue-600 pl-1 py-0 rounded-lg"
        style={{ fontSize: "13px" }}
      >
        <span>{props.children}</span>
      </div>
    </components.MultiValue>
  );
};

const CustomOption = (props: OptionProps<Option>) => {
  return (
    <components.Option {...props}>
      <div
        className={`cursor-pointer capitalize px-1 py-1 transition-colors w-full text-sm text-blue-700`}
      >
        {props.children}
      </div>
    </components.Option>
  );
};

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    padding: "0.45rem",
    borderRadius: "0.8rem",
    borderColor: state.isFocused ? "#2563EB" : "#D1D5DB",
    boxShadow: "none",
    // "&:hover": {
    //   borderColor: "#2563EB",
    // },
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: "#9CA3AF",
    fontWeight: 200,
    fontSize: "14px",
  }),
  multiValue: (provided: any) => ({
    ...provided,
    backgroundColor: "#DBEAFE",
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: "#2563EB",
  }),
  multiValueRemove: (provided: any) => ({
    ...provided,
    color: "#2563EB",
    cursor: "pointer",
    "&:hover": {
      color: "#1E40AF",
    },
  }),
};

const CustomSelect = ({
  tag,
  options,
  placeholder,
  label,
  error,
  selectedOption,
  setSelectedOption,
}: {
  options: Option[];
  placeholder: string;
  label: string;
  error: string;
  selectedOption: Option[];
  setSelectedOption: any;
  tag?: string;
}) => {
  return (
    <div className="w-full">
      <span className="text-sm text-gray-600 mb-1 inline-block">{label}</span>
      <Select
        isMulti
        options={options}
        value={selectedOption}
        onChange={(selected) => {
          tag
            ? setSelectedOption(tag, selected)
            : setSelectedOption(selected as Option[] | null);
        }}
        closeMenuOnSelect={false}
        placeholder={placeholder}
        components={{
          MultiValue: CustomMultiValue,
          Option: CustomOption,
          IndicatorSeparator: () => null,
        }}
        styles={customStyles}
        classNamePrefix="react-select"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default CustomSelect;
