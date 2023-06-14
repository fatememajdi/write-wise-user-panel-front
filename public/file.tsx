import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={60}
        height={48}
        fill="none"
        {...props}
    >
        <path
            fill="#fff"
            d="M53.333 6.5H30L24.167.667h-17.5C3.458.667.863 3.292.863 6.5l-.03 35c0 3.208 2.625 5.833 5.834 5.833h46.666c3.209 0 5.834-2.625 5.834-5.833V12.333c0-3.208-2.625-5.833-5.834-5.833Zm-17.5 29.167H12.5v-5.834h23.333v5.834ZM47.5 24h-35v-5.833h35V24Z"
        />
    </svg>
)
export default SvgComponent
