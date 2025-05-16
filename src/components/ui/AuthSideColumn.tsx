import React from "react";
import Image from "next/image";

interface SideColumnProps {
  imageSrc: string;
  altText: string;
}

const SideColumn: React.FC<SideColumnProps> = ({ imageSrc, altText }) => {
  return (
    <div className="relative w-full h-screen">
      <Image
        src={imageSrc}
        alt={altText}
        fill={true}
        quality={100}
        style={{ objectFit: "cover" }}
      />
    </div>
  );
};

export default SideColumn;
