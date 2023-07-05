import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={27}
        height={27}
        fill="none"
        {...props}
    >
        <path
            fill="#F3F3F3"
            d="M13.5 0C6.048 0 0 6.048 0 13.5S6.048 27 13.5 27 27 20.952 27 13.5 20.952 0 13.5 0Zm0 4.05a4.045 4.045 0 0 1 4.05 4.05 4.045 4.045 0 0 1-4.05 4.05A4.045 4.045 0 0 1 9.45 8.1a4.045 4.045 0 0 1 4.05-4.05Zm0 19.17a9.72 9.72 0 0 1-8.1-4.347c.04-2.687 5.4-4.158 8.1-4.158 2.686 0 8.06 1.471 8.1 4.158a9.72 9.72 0 0 1-8.1 4.347Z"
        />
    </svg>
)
export default SvgComponent
