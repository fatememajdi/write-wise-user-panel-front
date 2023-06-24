import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={27}
        height={42}
        fill="none"
        {...props}
    >
        <g filter="url(#a)">
            <path
                fill="#2E4057"
                d="M23 30.005 11.256 17 23 3.995 19.385 0 4 17l15.385 17L23 30.005Z"
            />
        </g>
        <defs>
            <filter
                id="a"
                width={27}
                height={42}
                x={0}
                y={0}
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
            >
                <feFlood floodOpacity={0} result="BackgroundImageFix" />
                <feColorMatrix
                    in="SourceAlpha"
                    result="hardAlpha"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                />
                <feOffset dy={4} />
                <feGaussianBlur stdDeviation={2} />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_1318_9250"
                />
                <feBlend
                    in="SourceGraphic"
                    in2="effect1_dropShadow_1318_9250"
                    result="shape"
                />
            </filter>
        </defs>
    </svg>
)
export default SvgComponent
