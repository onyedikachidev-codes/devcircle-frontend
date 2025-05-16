import Image from "next/image";

const AvatarComponent = ({
  avatar,
  className,
  handleOnClick,
}: {
  avatar?: string | undefined | null;
  className: string;
  handleOnClick?: () => void;
}) => {
  return (
    <div
      className="border border-gray-300 rounded-full p-1"
      onClick={() => handleOnClick && handleOnClick()}
    >
      <div className={`rounded-full ${className} relative`}>
        <Image
          src={avatar || "/images/profile-placeholder.png"}
          width={0}
          height={0}
          alt="avatar"
          layout="fill"
          className="rounded-full"
        />
      </div>
    </div>
  );
};

export default AvatarComponent;
