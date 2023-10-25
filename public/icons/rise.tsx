import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={108}
        height={37}
        fill="none"
        {...props}
    >
        <path
            fill="#2E4057"
            d="m85.4 0 8.244 7.06-17.568 15.048-14.4-12.334L35 32.653 40.076 37l21.6-18.5 14.4 12.333 22.68-19.394L107 18.5V0H85.4Z"
        />
    </svg>
)
export default SvgComponent
