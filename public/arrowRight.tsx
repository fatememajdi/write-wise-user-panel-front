import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={66}
        height={33}
        fill="none"
        {...props}
    >
        <path
            fill="#2E4057"
            d="M49.541 12.375H0v8.25h49.541V33L66 16.5 49.541 0v12.375Z"
        />
    </svg>
)
export default SvgComponent
