import type { SVGProps } from "react";

const LeftIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    {...props}
  >
    <g className="left-outline">
      <g fill="currentColor" fillRule="evenodd" className="Vector" clipRule="evenodd">
        <path fill="currentColor" d="m12.058 16l.101.005a1 1 0 0 1 0 1.99l-.101.005H4a1 1 0 1 1 0-2zM20 11a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2zm0-5a1 1 0 1 1 0 2H4a1 1 0 0 1 0-2z" />
      </g>
    </g>
  </svg>
);

export default LeftIcon;