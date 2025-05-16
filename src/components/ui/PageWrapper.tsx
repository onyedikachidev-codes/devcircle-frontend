import ErrorPage from "./ErrorPage";

interface IPageWrapperWithErrorProps {
  error: Error | null;
  children: React.ReactNode;
}

const PageWrapperWithError: React.FC<IPageWrapperWithErrorProps> = ({
  error,
  children,
}) => {
  return (
    <>
      {error && (
        <div className="min-h-screen w-full bg-white">
          <ErrorPage type="dashboard" />
        </div>
      )}
      {!error && children}
    </>
  );
};

export default PageWrapperWithError;
