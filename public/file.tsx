import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={111}
        height={72}
        fill="none"
        {...props}
    >
        <g clipPath="url(#a)">
            <path
                fill={props.color ? props.color : "#2E4057"}
                d="M96.833 18H72.5l-6.083-6h-18.25c-3.346 0-6.053 2.7-6.053 6l-.03 36c0 3.3 2.737 6 6.083 6h48.666c3.346 0 6.084-2.7 6.084-6V24c0-3.3-2.738-6-6.084-6Zm-18.25 30H54.25v-6h24.333v6ZM90.75 36h-36.5v-6h36.5v6Z"
            />
        </g>
        <defs>
            <clipPath id="a">
                <path fill="#fff" d="M36 0h73v72H36z" />
            </clipPath>
        </defs>
    </svg>
)
export default SvgComponent
