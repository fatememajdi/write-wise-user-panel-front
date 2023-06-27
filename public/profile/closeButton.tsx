import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={89}
        height={89}
        fill="none"
        {...props}
    >
        <circle
            cx={44.091}
            cy={44.091}
            r={43.091}
            fill="url(#a)"
            stroke="url(#b)"
            strokeWidth={2}
        />
        <path
            fill="url(#c)"
            d="M59.923 33.324 56.6 30 43.423 43.176 30.247 30l-3.324 3.324L40.1 46.5 26.922 59.676 30.247 63l13.176-13.176L56.6 63l3.324-3.324L46.747 46.5l13.176-13.176Z"
        />
        <defs>
            <linearGradient
                id="a"
                x1={-17.654}
                x2={69.923}
                y1={0}
                y2={102.462}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#F3F3F3" />
                <stop offset={1} stopColor="#F3F3F3" stopOpacity={0.86} />
            </linearGradient>
            <linearGradient
                id="b"
                x1={44.308}
                x2={44.308}
                y1={27.346}
                y2={129.808}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#354860" />
                <stop offset={1} stopColor="#DA282E" />
            </linearGradient>
            <linearGradient
                id="c"
                x1={26.923}
                x2={43.423}
                y1={17.33}
                y2={63}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#DA282E" />
                <stop offset={1} stopColor="#2E4057" />
            </linearGradient>
        </defs>
    </svg>
)
export default SvgComponent
