import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={70}
        height={70}
        fill="none"
        {...props}
    >
        <circle cx={35} cy={35} r={35} fill="#2E4057" fillOpacity={0.15} />
        <g clipPath="url(#a)">
            <path
                fill="#fff"
                d="m61.75 13.25 1.563-3.438L66.75 8.25l-3.438-1.563L61.75 3.25l-1.563 3.438L56.75 8.25l3.438 1.563 1.562 3.437Zm-9.375.625L49.25 7l-3.125 6.875L39.25 17l6.875 3.125L49.25 27l3.125-6.875L59.25 17l-6.875-3.125Zm9.375 6.875-1.563 3.438-3.437 1.562 3.438 1.563 1.562 3.437 1.563-3.438 3.437-1.562-3.438-1.563-1.562-3.437Z"
            />
        </g>
        <g clipPath="url(#b)">
            <path
                fill="#fff"
                d="M31.5 36.25c-5.675-1.475-7.5-3-7.5-5.375 0-2.725 2.525-4.625 6.75-4.625 4.45 0 6.1 2.125 6.25 5.25h5.525c-.175-4.3-2.8-8.25-8.025-9.525V16.5H27v5.4c-4.85 1.05-8.75 4.2-8.75 9.025 0 5.775 4.775 8.65 11.75 10.325 6.25 1.5 7.5 3.7 7.5 6.025 0 1.725-1.225 4.475-6.75 4.475-5.15 0-7.175-2.3-7.45-5.25h-5.5c.3 5.475 4.4 8.55 9.2 9.575V61.5h7.5v-5.375c4.875-.925 8.75-3.75 8.75-8.875 0-7.1-6.075-9.525-11.75-11Z"
            />
        </g>
        <defs>
            <clipPath id="a">
                <path fill="#fff" d="M38 2h30v30H38z" />
            </clipPath>
            <clipPath id="b">
                <path fill="#fff" d="M2 9h60v60H2z" />
            </clipPath>
        </defs>
    </svg>
)
export default SvgComponent
