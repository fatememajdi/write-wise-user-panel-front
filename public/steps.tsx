import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={269}
        height={66}
        fill="none"
        {...props}
    >
        <path
            stroke="#F3F3F3"
            strokeLinecap="round"
            d="M1 65h57.4V42.434h70.36V20.977h66.657V1H268"
        />
    </svg>
)
export default SvgComponent
