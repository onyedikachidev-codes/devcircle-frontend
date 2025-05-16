import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

import { WithTooltip } from "./WithTooltip";

const ShareComponent = ({ text, page }: { text: string; page?: string }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [copied, setCopied] = useState(false);

  const url = `${
    process.env.NEXT_PUBLIC_APP_URL || "https://TechGather.fly.dev"
  }${
    pathname.includes("dashboard")
      ? pathname.split("/dashboard").join("")
      : pathname
  }${
    searchParams
      ? `${searchParams.toString() ? "?" : ""}${searchParams.toString()}`
      : ""
  }`;

  const shareUrls: { [key: string]: string } = {
    Linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      url
    )}`,
    Twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(text || "")}`,
    Facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`,
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="space-y-1">
      <h3 className="text-sm text-gray-600 font-bold">Share</h3>
      <div className="flex space-x-3">
        {["Linkedin", "Twitter", "Facebook"].map((platform) => (
          <div key={platform}>
            {WithTooltip(
              platform,
              <a
                href={shareUrls[platform]}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={`/icons/${platform.toLowerCase()}-share.svg`}
                  alt={`${platform} share icon`}
                  width={20}
                  height={20}
                />
              </a>
            )}
          </div>
        ))}
        {page === "article" && (
          <div>
            {WithTooltip(
              copied ? "Copied!" : "Copy Link",
              <button onClick={handleCopyLink} className="focus:outline-none">
                <Image
                  src="/icons/copy-link.svg"
                  alt="Copy link icon"
                  width={20}
                  height={20}
                />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShareComponent;
