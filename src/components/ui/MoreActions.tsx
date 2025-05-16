import React, { ReactNode, useState, useEffect, useRef } from "react";

interface IMoreActionComponentProps {
  renderWithAction: (toggleMoreActionsModal: () => void) => ReactNode;
}

const MoreActionsComponent: React.FC<IMoreActionComponentProps> = ({
  renderWithAction,
}) => {
  const [moreActionsPopup, setMoreActionsPopup] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleToggleMoreActionsModal = () => {
    setMoreActionsPopup((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setMoreActionsPopup(false);
    }
  };

  useEffect(() => {
    if (moreActionsPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [moreActionsPopup]);

  return (
    <div ref={modalRef} className="relative">
      {!moreActionsPopup && (
        <button onClick={handleToggleMoreActionsModal}>
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="6" r="1.5" fill="#1d4ed8" />
            <circle cx="12" cy="12" r="1.5" fill="#1d4ed8" />
            <circle cx="12" cy="18" r="1.5" fill="#1d4ed8" />
          </svg>
        </button>
      )}
      {moreActionsPopup && (
        <div className="absolute -top-3 right-0">
          <ul className="bg-white w-32 border border-gray-200 rounded">
            {renderWithAction(handleToggleMoreActionsModal)}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MoreActionsComponent;
