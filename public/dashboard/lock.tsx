import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={18}
        height={21}
        fill="none"
        {...props}
    >
        <path
            fill="#fff"
            d="M15.149 7h-1.082V5c0-2.76-2.424-5-5.41-5-2.987 0-5.41 2.24-5.41 5v2H2.163C.974 7 0 7.9 0 9v10c0 1.1.974 2 2.164 2H15.15c1.19 0 2.164-.9 2.164-2V9c0-1.1-.974-2-2.164-2Zm-6.493 9c-1.19 0-2.164-.9-2.164-2s.974-2 2.164-2c1.19 0 2.165.9 2.165 2s-.974 2-2.165 2Zm3.355-9H5.302V5c0-1.71 1.504-3.1 3.354-3.1s3.355 1.39 3.355 3.1v2Z"
        />
    </svg>
)
export default SvgComponent
