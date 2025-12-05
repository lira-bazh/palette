import type { FC } from "react";

export const ArrowUpDownIcon: FC<React.SVGProps<SVGSVGElement>> = props => {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 3V21M12 3L16 7M12 3L8 7M12 21L8 17M12 21L16 17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};