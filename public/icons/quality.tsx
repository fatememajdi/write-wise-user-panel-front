import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={55}
        height={53}
        fill="none"
        {...props}
    >
        <path
            fill="#F3F3F3"
            d="m55 26.25-6.1-6.975.85-9.225L40.725 8 36 0l-8.5 3.65L19 0l-4.725 7.975L5.25 10l.85 9.25-6.1 7 6.1 6.975-.85 9.25 9.025 2.05L19 52.5l8.5-3.675 8.5 3.65 4.725-7.975 9.025-2.05-.85-9.225L55 26.25Zm-32.275 11.8-9.5-9.525 3.7-3.7 5.8 5.825L37.35 15.975l3.7 3.7L22.725 38.05Z"
        />
    </svg>
)
export default SvgComponent
