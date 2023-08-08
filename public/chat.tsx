import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={37}
        height={39}
        fill="none"
        {...props}
    >
        <path
            fill="#fff"
            d="M36.587 12.664V28.42c0 1.921-1.604 3.494-3.564 3.494H8.077L.95 38.901V7.458c0-1.922 1.604-3.494 3.564-3.494H22.51a9.373 9.373 0 0 0-.178 1.747c0 4.821 3.992 8.734 8.91 8.734 2.013 0 3.848-.681 5.345-1.781ZM25.896 5.71c0 2.9 2.388 5.24 5.346 5.24 2.957 0 5.345-2.34 5.345-5.24 0-2.9-2.388-5.241-5.345-5.241-2.958 0-5.346 2.34-5.346 5.24Z"
        />
    </svg>
)
export default SvgComponent
