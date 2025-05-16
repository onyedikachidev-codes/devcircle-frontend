import Image from "next/image";
import Input from "./Input";
import { useState } from "react";

interface IAddItemInput {
  item?: any;
  items?: any;
  setItem?: any;
  setItems?: any;
  label: string;
  tag?: string;
  userEmail?: string;
}

const AddItemInput: React.FC<IAddItemInput> = ({
  label,
  items,
  setItems,
  tag,
  userEmail,
}) => {
  const [item, setItem] = useState("");

  return (
    <div className="w-full">
      <div>
        <div className="flex space-x-2 items-end">
          <div className="flex-1">
            <div className="w-full">
              <Input
                label={label}
                type="email"
                onChange={(e) => {
                  setItem(e.target.value);
                }}
              />
            </div>
          </div>
          <p
            className="mb-1 cursor-pointer h-10 px-3 flex items-center text-xs rounded bg-gray-600 text-white"
            onClick={() =>
              setItems(
                tag,
                items.includes(item) || userEmail === item
                  ? items
                  : [...items, item]
              )
            }
          >
            Add
          </p>
        </div>
        <div className="mt-2 flex gap-1 flex-wrap">
          {items &&
            items.map((email: string) => {
              return (
                <div
                  key={email}
                  className="py-1 px-3 text-xs bg-blue-100 text-blue-700 rounded flex items-center justify-center space-x-2"
                >
                  <span className="">{email}</span>
                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      setItems(
                        tag,
                        items.filter((item: string) => item !== email)
                      );
                    }}
                  >
                    <Image
                      width={15}
                      height={15}
                      src="/icons/cross.svg"
                      alt=""
                    />
                  </span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default AddItemInput;
