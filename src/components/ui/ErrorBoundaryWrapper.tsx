import React from "react";
import ErrorBoundary from "@/lib/ErrorBoundary";

interface IErrorBoundaryProps {
  children: React.ReactNode;
}

const PageWithErrorBoundary: React.FC<IErrorBoundaryProps> = ({ children }) => {
  return (
    <ErrorBoundary
    // fallback={<h2></h2>}
    >
      {children}
    </ErrorBoundary>
  );
};

export default PageWithErrorBoundary;
