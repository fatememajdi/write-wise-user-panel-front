import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={354}
        height={354}
        fill="none"
        {...props}
    >
        <circle cx={177} cy={177} r={177} fill="url(#a)" fillOpacity={0.38} />
        <circle cx={174.5} cy={177.5} r={149.5} fill="url(#b)" fillOpacity={0.38} />
        <g filter="url(#c)">
            <circle cx={175.414} cy={177.414} r={127.414} fill="#AB141D" />
        </g>
        <path stroke="#F3F3F3" strokeWidth={12} d="M123 181h101" />
        <defs>
            <linearGradient
                id="a"
                x1={177}
                x2={177}
                y1={0}
                y2={354}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#AB141D" stopOpacity={0.65} />
                <stop offset={1} stopColor="#AB141D" stopOpacity={0.45} />
            </linearGradient>
            <linearGradient
                id="b"
                x1={174.5}
                x2={174.5}
                y1={28}
                y2={327}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#AB141D" stopOpacity={0.18} />
                <stop offset={1} stopColor="#AB141D" stopOpacity={0.42} />
            </linearGradient>
            <filter
                id="c"
                width={282.986}
                height={282.987}
                x={35.329}
                y={40.849}
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
            >
                <feFlood floodOpacity={0} result="BackgroundImageFix" />
                <feColorMatrix
                    in="SourceAlpha"
                    result="hardAlpha"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                />
                <feMorphology
                    in="SourceAlpha"
                    operator="dilate"
                    radius={1.408}
                    result="effect1_dropShadow_3340_3398"
                />
                <feOffset dx={1.408} dy={4.928} />
                <feGaussianBlur stdDeviation={6.336} />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_3340_3398"
                />
                <feBlend
                    in="SourceGraphic"
                    in2="effect1_dropShadow_3340_3398"
                    result="shape"
                />
            </filter>
        </defs>
    </svg>
)
export default SvgComponent
