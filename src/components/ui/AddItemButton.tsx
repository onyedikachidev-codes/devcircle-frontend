import { ReactNode } from "react";

interface IAddItemButtonProps {
  icon: ReactNode;
  handleOnClick: () => void;
  fill?: string;
}

const AddItemButton: React.FC<IAddItemButtonProps> = ({
  icon,
  handleOnClick,
  fill = "bg-blue-600 text-white hover:bg-blue-700",
}) => {
  return (
    <button
      onClick={handleOnClick}
      className={`flex items-center h-full px-3 py-2  font-medium text-sm rounded-md ${fill}`}
    >
      {icon}
    </button>
  );
};

export default AddItemButton;
