import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={80}
        height={73}
        fill="none"
        {...props}
    >
        <g clipPath="url(#a)">
            <path
                stroke="#2E4057"
                d="m35.597 27.145.107.355h17.737L39.284 37.618l-.293.21.106.345 5.415 17.487-14.21-10.783-.302-.23-.303.23-14.183 10.781 5.414-17.485.107-.345-.295-.21L6.561 27.5h17.734l.108-.355L30 8.72l5.597 18.425Z"
            />
        </g>
        <g clipPath="url(#b)">
            <path
                fill="#DA282E"
                d="M59.087 32.167 52 8.833l-7.087 23.334h-22.08l18.025 12.862-6.854 22.138L52 53.487l18.025 13.68-6.854-22.138 17.996-12.862h-22.08Z"
            />
        </g>
        <defs>
            <clipPath id="a">
                <path fill="#fff" d="M0 2h60v60H0z" />
            </clipPath>
            <clipPath id="b">
                <path fill="#fff" d="M17 3h70v70H17z" />
            </clipPath>
        </defs>
    </svg>
)
export default SvgComponent
