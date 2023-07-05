import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={30}
        height={27}
        fill="none"
        {...props}
    >
        <path
            fill="#fff"
            d="M28.5 13.83C28.5 5.595 22.11 0 15 0 7.965 0 1.5 5.475 1.5 13.92.6 14.43 0 15.39 0 16.5v3c0 1.65 1.35 3 3 3h1.5v-9.15c0-5.805 4.695-10.5 10.5-10.5s10.5 4.695 10.5 10.5V24h-12v3h12c1.65 0 3-1.35 3-3v-1.83a2.773 2.773 0 0 0 1.5-2.46v-3.45c0-1.05-.615-1.965-1.5-2.43Z"
        />
        <path
            fill="#fff"
            d="M10.5 16.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM19.5 16.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
        />
        <path
            fill="#fff"
            d="M24 12.045C23.28 7.77 19.56 4.5 15.075 4.5c-4.545 0-9.435 3.765-9.045 9.675a12.112 12.112 0 0 0 7.29-8.835c1.965 3.945 6 6.66 10.68 6.705Z"
        />
    </svg>
)
export default SvgComponent
