import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={42}
        height={34}
        fill="none"
        {...props}
    >
        <path
            stroke="#2E4057"
            d="m17.01 11.938.107.357h9.054l-7.085 5.136-.289.21.104.34 2.717 8.901-7.106-5.47-.305-.235-.305.235L6.81 26.88l2.716-8.898.104-.342-.29-.21-7.095-5.135h9.052l.107-.357 2.803-9.36 2.803 9.36Z"
        />
        <path
            fill="#DA282E"
            d="M29.92 14.626 26.093 1.84l-3.83 12.786H10.336l9.738 7.048-3.703 12.13 9.722-7.496 9.737 7.496-3.703-12.13 9.722-7.048H29.921Z"
        />
    </svg>
)
export default SvgComponent
