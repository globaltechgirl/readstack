import type { SVGProps } from "react";

const ListIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    {...props}
  >
    <g className="list-outline">
      <g fill="currentColor" fillRule="evenodd" className="Vector" clipRule="evenodd">
        <path fillRule="evenodd" d="M7 7a1 1 0 0 1 1-1h11a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1m0 5a1 1 0 0 1 1-1h11a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1m0 5a1 1 0 0 1 1-1h11a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1" clip-Rule="evenodd" />
			  <path d="M6 7a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0 5a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0 5a1 1 0 1 1-2 0a1 1 0 0 1 2 0" />
      </g>
    </g>
  </svg>
);

export default ListIcon;