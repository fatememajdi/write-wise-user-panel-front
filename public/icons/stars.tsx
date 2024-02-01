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
                stroke="#2E4057"
                strokeWidth={1.422}
                d="m37.134 28.353.154.504h18.136L41.071 39.059l-.42.299.153.492 5.501 17.67-14.43-10.89-.43-.324-.428.323-14.403 10.889 5.5-17.668.154-.492-.42-.299L7.47 28.857h18.133l.154-.504L31.446 9.73l5.688 18.623Z"
            />
        </g>
        <g clipPath="url(#b)">
            <path
                fill="#2E4057"
                d="M57.74 30.433 50.313 6.11l-7.43 24.324H19.74l18.894 13.409-7.185 23.077 18.864-14.26 18.893 14.26-7.184-23.077 18.863-13.409H57.74Z"
            />
        </g>
        <defs>
            <clipPath id="a">
                <path fill="#fff" d="M0 0h62.892v62.547H0z" />
            </clipPath>
            <clipPath id="b">
                <path fill="#fff" d="M13.625.027h73.374v72.971H13.625z" />
            </clipPath>
        </defs>
    </svg>
)
export default SvgComponent
