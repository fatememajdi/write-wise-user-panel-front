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
        <circle cx={177.5} cy={176.5} r={149.5} fill="url(#b)" fillOpacity={0.38} />
        <g filter="url(#c)">
            <circle cx={177.414} cy={176.414} r={127.414} fill="#2E4057" />
        </g>
        <g filter="url(#d)">
            <path
                fill="#F3F3F3"
                d="m165.284 204.014-26.706-26.706-6.094 6.03 32.8 33.8 73.852-74.852-6.03-6.03-67.822 67.758Z"
            />
        </g>
        <defs>
            <linearGradient
                id="a"
                x1={177}
                x2={177}
                y1={0}
                y2={354}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#2E4057" stopOpacity={0.29} />
                <stop offset={1} stopColor="#2E4057" stopOpacity={0.46} />
            </linearGradient>
            <linearGradient
                id="b"
                x1={177.5}
                x2={177.5}
                y1={27}
                y2={326}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#2E4057" stopOpacity={0.29} />
                <stop offset={1} stopColor="#2E4057" stopOpacity={0.46} />
            </linearGradient>
            <filter
                id="c"
                width={282.986}
                height={282.987}
                x={37.329}
                y={39.849}
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
                    result="effect1_dropShadow_3340_3397"
                />
                <feOffset dx={1.408} dy={4.928} />
                <feGaussianBlur stdDeviation={6.336} />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_3340_3397"
                />
                <feBlend
                    in="SourceGraphic"
                    in2="effect1_dropShadow_3340_3397"
                    result="shape"
                />
            </filter>
            <filter
                id="d"
                width={136.648}
                height={110.881}
                x={117.484}
                y={130.256}
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
            >
                <feFlood floodOpacity={0} result="BackgroundImageFix" />
                <feColorMatrix
                    in="SourceAlpha"
                    result="hardAlpha"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                />
                <feOffset dy={9} />
                <feGaussianBlur stdDeviation={7.5} />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_3340_3397"
                />
                <feBlend
                    in="SourceGraphic"
                    in2="effect1_dropShadow_3340_3397"
                    result="shape"
                />
            </filter>
        </defs>
    </svg>
)
export default SvgComponent
