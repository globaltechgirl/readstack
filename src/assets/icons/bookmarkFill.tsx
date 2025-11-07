import type { SVGProps } from "react";

const BookmarkFillIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    {...props}
  >
    <g className="bookmark-fill-outline">
      <g fill="currentColor" fillRule="evenodd" className="Vector" clipRule="evenodd">
        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 7v14l-6-4l-6 4V7a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4" />
      </g>
    </g>
  </svg>
);

export default BookmarkFillIcon;