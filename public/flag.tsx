import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={35}
        height={64}
        fill="none"
        {...props}
    >
        <g stroke="#F3F3F3" strokeWidth={2}>
            <path d="M1 0v64M1 1v20.293h16.657L20.486 27H34V6.39H20.486L17.657 1H1Z" />
        </g>
    </svg>
)
export default SvgComponent
