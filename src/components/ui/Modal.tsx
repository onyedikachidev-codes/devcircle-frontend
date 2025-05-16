import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Fragment } from "react";

interface AppModalProps {
  isOpen: boolean;
  width?: string;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export default function AppModal({
  isOpen,
  onClose,
  title,
  children,
  width = "w-full sm:w-[70%] md:w-[50%] lg:w-[45%] xl:w-[40%] xxl:w-[25%]",
}: AppModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </TransitionChild>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-2 lg:p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel
                className={`${width} transform overflow-hidden rounded-2xl bg-white p-2 lg:p-4 text-left align-middle shadow-xl transition-all`}
              >
                <div
                  className={`flex ${
                    !title ? "justify-end" : "justify-between"
                  } items-center px-1 xs:px-2 lg:px-4`}
                >
                  {title && (
                    <DialogTitle
                      as="h3"
                      className="text-base font-app-medium mt-2 leading-6 text-gray-700 capitalize"
                    >
                      {title}
                    </DialogTitle>
                  )}
                  <button
                    onClick={onClose}
                    className="text-custom-gray-paragraph hover:text-gray-700 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="mt-2">{children}</div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
