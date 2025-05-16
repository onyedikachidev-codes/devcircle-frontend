import { Toaster } from "react-hot-toast";

import { WithTooltip } from "./WithTooltip";
import { Comment, Reaction } from "@/common/constants";
import { infoToast } from "@/lib/helpers/toast";

import "../../app/globals.css";

interface IPublicCommentsProps {
  comments: Comment[];
  reactions: Reaction[];
}

export const PublicComments: React.FC<IPublicCommentsProps> = ({
  comments,
  reactions,
}) => {
  return (
    <>
      <div className="flex items-center space-x-5 justify-end">
        <div
          className="flex space-x-1 items-center"
          onClick={() => infoToast("Please login to continue")}
        >
          {WithTooltip(
            "Comments",
            <svg
              className="w-5 h-5"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="none" fillRule="evenodd">
                <path d="m0 0h32v32h-32z" />
                <path
                  d="m24 2c4.418278 0 8 3.581722 8 8v9c0 4.418278-3.581722 8-8 8h-14.65568992c-.8644422 0-1.70562318.280039-2.39757043.7981793l-3.74795444 2.8065233c-.88415838.6620708-2.13762479.4820332-2.79969558-.4021251-.25907013-.3459737-.39908963-.7665641-.39908963-1.1987852v-19.0037923c0-4.418278 3.581722-8 8-8zm-2.571997 10.0964585c-.4991419-.2363809-1.0954008-.023371-1.3317816.4757709-.6771647 1.4299014-2.3250027 2.4280053-4.099688 2.4280053-1.7734204 0-3.4129473-.9905459-4.0942267-2.416524-.2380843-.4983315-.8350673-.7093035-1.3333988-.4712192-.4983316.2380843-.70930361.8350673-.4712193 1.3333988 1.0200199 2.1349917 3.3692971 3.5543444 5.8988448 3.5543444 2.5328429 0 4.8924921-1.4292516 5.9072405-3.5719947.2363808-.4991418.0233709-1.0954007-.4757709-1.3317815z"
                  fill="#1d4ed8"
                />
              </g>
            </svg>
          )}
          <span className="text-xs-sm">({comments!.length})</span>
        </div>
        <div
          className="flex space-x-1 items-center"
          onClick={() => infoToast("Please login to continue")}
        >
          {WithTooltip(
            "Reactions",
            <div>
              <svg
                version="1.0"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                className="w-5 h-5"
                viewBox="0 0 64 64"
                enableBackground="new 0 0 64 64"
                xmlSpace="preserve"
              >
                <path
                  fill="#ef4444"
                  d="M48,5c-4.418,0-8.418,1.791-11.313,4.687l-3.979,3.961c-0.391,0.391-1.023,0.391-1.414,0
	c0,0-3.971-3.97-3.979-3.961C24.418,6.791,20.418,5,16,5C7.163,5,0,12.163,0,21c0,3.338,1.024,6.436,2.773,9
	c0,0,0.734,1.164,1.602,2.031s24.797,24.797,24.797,24.797C29.953,57.609,30.977,58,32,58s2.047-0.391,2.828-1.172
	c0,0,23.93-23.93,24.797-24.797S61.227,30,61.227,30C62.976,27.436,64,24.338,64,21C64,12.163,56.837,5,48,5z M57,22
	c-0.553,0-1-0.447-1-1c0-4.418-3.582-8-8-8c-0.553,0-1-0.447-1-1s0.447-1,1-1c5.522,0,10,4.478,10,10C58,21.553,57.553,22,57,22z"
                />
              </svg>
            </div>
          )}
          {WithTooltip(
            "View profiles",
            <span className="text-xs-sm cursor-pointer">
              ({reactions!.length})
            </span>
          )}
        </div>
      </div>
      <Toaster />
    </>
  );
};
