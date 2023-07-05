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
            fill="#fff"
            d="M25.579 22.5V24c0 1.65-1.279 3-2.842 3H2.842C1.265 27 0 25.65 0 24V3c0-1.65 1.265-3 2.842-3h19.895c1.563 0 2.842 1.35 2.842 3v1.5h-12.79c-1.577 0-2.842 1.35-2.842 3v12c0 1.65 1.265 3 2.843 3h12.789Zm-12.79-3H27v-12H12.79v12Zm5.685-3.75c-1.18 0-2.132-1.005-2.132-2.25s.952-2.25 2.132-2.25c1.18 0 2.131 1.005 2.131 2.25s-.952 2.25-2.131 2.25Z"
        />
    </svg>
)
export default SvgComponent
