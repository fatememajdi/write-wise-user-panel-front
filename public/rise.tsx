import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={72}
        height={72}
        fill="none"
        {...props}
    >
        <path
            stroke="#2E4057"
            d="M29.259 42.146 12.113 59.293l-3.406-3.406 20.906-20.934 11.313 11.313.353.354.354-.354 14.233-14.233.354-.354-.354-.353L50.04 25.5h15.793v15.793l-5.825-5.826-.354-.353-.353.353L41.279 53.46 29.966 42.146l-.354-.353-.353.353Z"
        />
        <path
            fill="#DA282E"
            d="m47.833 19 6.68 6.68-14.234 14.233-11.667-11.667L7 49.888 11.113 54l17.5-17.5 11.666 11.667L58.654 29.82l6.68 6.679V19h-17.5Z"
        />
    </svg>
)
export default SvgComponent
