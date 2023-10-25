import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={74}
        height={74}
        fill="none"
        {...props}
    >
        <g fill="#fff" clipPath="url(#a)">
            <path d="M37 46.867c5.45 0 9.867-4.418 9.867-9.867 0-5.45-4.418-9.867-9.867-9.867-5.45 0-9.867 4.418-9.867 9.867 0 5.45 4.418 9.867 9.867 9.867Z" />
            <path d="m27.75 6.167-5.642 6.166h-9.775c-3.391 0-6.166 2.775-6.166 6.167v37c0 3.392 2.775 6.167 6.166 6.167h49.334c3.391 0 6.166-2.775 6.166-6.167v-37c0-3.392-2.775-6.167-6.166-6.167h-9.775L46.25 6.167h-18.5ZM37 52.417c-8.51 0-15.417-6.907-15.417-15.417S28.49 21.583 37 21.583 52.417 28.49 52.417 37 45.51 52.417 37 52.417Z" />
        </g>
        <defs>
            <clipPath id="a">
                <path fill="#fff" d="M0 0h74v74H0z" />
            </clipPath>
        </defs>
    </svg>
)
export default SvgComponent
