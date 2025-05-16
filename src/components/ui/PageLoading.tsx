import Image from "next/image";

const PageLoadingComponent = () => {
  return (
    <div className="w-full h-dvh flex justify-center bg-white">
      <div className="mt-40 h-20 flex space-x-3 items-center">
        <Image src="/icons/page-loader.gif" alt="" width={40} height={40} />
        <p style={{ fontSize: "15px" }}>
          Making things cool behind the scenes...{" "}
          <span className="ml-1">😉</span>
        </p>
      </div>
    </div>
  );
};

export default PageLoadingComponent;
