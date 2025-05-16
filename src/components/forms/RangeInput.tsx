interface RangeInputProps {
  id: string;
  label: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  displayMin?: string;
  displayMax?: string;
}

const RangeInput: React.FC<RangeInputProps> = ({
  id,
  label,
  min,
  max,
  step = 1,
  value,
  onChange,
  displayMin,
  displayMax,
}) => {
  return (
    <div className="w-full">
      <span className="block text-sm font-medium text-gray-700">{label}</span>
      <div className="mt-2">
        <input
          type="range"
          id={id}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div className="flex justify-between text-sm text-gray-600 mt-1">
          <span>{displayMin || `$${min}`}</span>
          <span>{displayMax || `$${max}`}</span>
        </div>
      </div>
    </div>
  );
};
