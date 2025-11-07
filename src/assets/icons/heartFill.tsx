import type { SVGProps } from "react";

const HeartFillIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    {...props}
  >
    <g className="heart-fill-outline">
      <g fill="currentColor" fillRule="evenodd" className="Vector" clipRule="evenodd">
        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.5 12.572L12 20l-7.5-7.428A5 5 0 1 1 12 6.006a5 5 0 1 1 7.5 6.572" />
      </g>
    </g>
  </svg>
);

export default HeartFillIcon;