import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={52}
        height={52}
        fill="none"
        {...props}
    >
        <path
            fill="#fff"
            d="M0 41.168V52h10.832l31.947-31.947L31.947 9.221 0 41.169Zm51.155-29.491a2.877 2.877 0 0 0 0-4.073L44.396.844a2.877 2.877 0 0 0-4.073 0l-5.286 5.287L45.87 16.963l5.286-5.286Z"
        />
    </svg>
)
export default SvgComponent
