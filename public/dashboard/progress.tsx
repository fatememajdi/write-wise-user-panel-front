import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={27}
        height={16}
        fill="none"
        {...props}
    >
        <path
            fill="#fff"
            d="m18.9 0 3.091 3.053-6.588 6.507-5.4-5.333L0 14.12 1.903 16l8.1-8 5.4 5.333 8.505-8.386L27 8V0h-8.1Z"
        />
    </svg>
)
export default SvgComponent
