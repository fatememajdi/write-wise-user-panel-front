import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={29}
        height={35}
        fill="none"
        {...props}
    >
        <g filter="url(#a)">
            <path
                fill="#fff"
                d="M14.5 5.136V2l-4.25 4.182 4.25 4.182V7.227c3.517 0 6.375 2.813 6.375 6.273 0 1.056-.266 2.06-.744 2.927l1.552 1.527A8.195 8.195 0 0 0 23 13.5c0-4.62-3.804-8.364-8.5-8.364Zm0 14.637c-3.517 0-6.375-2.813-6.375-6.273 0-1.056.266-2.06.744-2.927L7.318 9.046A8.195 8.195 0 0 0 6 13.5c0 4.62 3.804 8.364 8.5 8.364V25l4.25-4.182-4.25-4.182v3.137Z"
            />
        </g>
        <defs>
            <filter
                id="a"
                width={29}
                height={35}
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
                <feGaussianBlur stdDeviation={3} />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_21_1995" />
                <feBlend
                    in="SourceGraphic"
                    in2="effect1_dropShadow_21_1995"
                    result="shape"
                />
            </filter>
        </defs>
    </svg>
)
export default SvgComponent
