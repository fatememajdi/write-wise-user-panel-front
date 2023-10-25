import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={59}
        height={35}
        fill="none"
        {...props}
    >
        <path
            fill="#fff"
            d="m40.833 0 6.68 6.68-14.234 14.233L21.612 9.246 0 30.887 4.112 35l17.5-17.5L33.28 29.167 51.654 10.82l6.68 6.679V0h-17.5Z"
        />
    </svg>
)
export default SvgComponent
