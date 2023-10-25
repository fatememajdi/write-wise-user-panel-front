import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={87}
        height={73}
        fill="none"
        {...props}
    >
        <g clipPath="url(#a)">
            <path
                stroke={props.color ? props.color : "#2E4057"}
                strokeWidth={1.422}
                d="m37.134 28.404.154.503h18.134L41.07 39.097l-.42.299.153.492 5.5 17.65-14.43-10.88-.428-.323-.429.323-14.403 10.876 5.5-17.646.154-.493-.421-.298-14.374-10.19h18.131l.154-.503 5.688-18.602 5.688 18.602Z"
            />
        </g>
        <path
            fill={props.color ? props.color : "#2E4057"}
            d="M57.742 30.482 50.313 6.184l-7.429 24.297H19.741l18.894 13.393-7.185 23.05 18.863-14.243 18.894 14.244-7.185-23.051 18.864-13.393H57.742Z"
        />
        <defs>
            <clipPath id="a">
                <path fill="#fff" d="M0 .083h62.892v62.476H0z" />
            </clipPath>
        </defs>
    </svg>
)
export default SvgComponent
