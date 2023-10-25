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
                d="M4 3.995 15.744 17 4 30.005 7.615 34 23 17 7.615 0 4 3.995Z"
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
                    result="effect1_dropShadow_1318_9260"
                />
                <feBlend
                    in="SourceGraphic"
                    in2="effect1_dropShadow_1318_9260"
                    result="shape"
                />
            </filter>
        </defs>
    </svg>
)
export default SvgComponent
