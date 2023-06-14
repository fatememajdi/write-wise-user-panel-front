import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={40}
        height={40}
        fill="none"
        {...props}
    >
        <path
            fill={props.color ? props.color : "#2E4057"}
            d="M14 0C6.292 0 0 6.292 0 14s6.292 14 14 14c3.496 0 6.69-1.304 9.148-3.438l.852.852V28l12 12 4-4-12-12h-2.586l-.852-.852C26.697 20.69 28 17.496 28 14c0-7.708-6.292-14-14-14Zm0 4a9.97 9.97 0 0 1 10 10 9.97 9.97 0 0 1-10 10A9.97 9.97 0 0 1 4 14 9.97 9.97 0 0 1 14 4Z"
        />
    </svg>
)
export default SvgComponent
