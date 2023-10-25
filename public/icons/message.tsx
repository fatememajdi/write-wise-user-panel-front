import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={143}
        height={143}
        fill="none"
        {...props}
    >
        <circle cx={72.853} cy={61.193} r={46.193} fill="url(#a)" />
        <g filter="url(#b)">
            <circle
                cx={71.574}
                cy={71.574}
                r={46.193}
                fill="url(#c)"
                fillOpacity={0.5}
                transform="rotate(-165 71.574 71.574)"
            />
        </g>
        <path
            fill="#fff"
            d="M96.622 53.075v20.227c0 2.466-2.058 4.484-4.574 4.484H60.027l-9.15 8.97V46.393c0-2.467 2.06-4.485 4.575-4.485h23.101c-.137.718-.229 1.48-.229 2.243 0 6.189 5.124 11.212 11.436 11.212 2.585 0 4.94-.875 6.862-2.288ZM82.9 44.151c0 3.722 3.065 6.727 6.861 6.727 3.797 0 6.862-3.005 6.862-6.727 0-3.723-3.065-6.727-6.862-6.727-3.796 0-6.861 3.004-6.861 6.727Z"
        />
        <defs>
            <linearGradient
                id="a"
                x1={-24.466}
                x2={88.101}
                y1={-44.199}
                y2={84.065}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#DA282E" />
                <stop offset={1} stopColor="#2E4057" />
            </linearGradient>
            <linearGradient
                id="c"
                x1={-25.744}
                x2={86.822}
                y1={-33.817}
                y2={94.447}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#DA282E" />
                <stop offset={1} stopColor="#2E4057" />
            </linearGradient>
            <filter
                id="b"
                width={142.408}
                height={142.409}
                x={0.37}
                y={0.37}
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
            >
                <feFlood floodOpacity={0} result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur
                    result="effect1_foregroundBlur_22_1939"
                    stdDeviation={12.5}
                />
            </filter>
        </defs>
    </svg>
)
export default SvgComponent
