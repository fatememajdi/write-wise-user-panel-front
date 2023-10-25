import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={30}
        height={25}
        fill="none"
        {...props}
    >
        <path
            stroke="#2E4057"
            d="m12.88 3.03.146.149h10.797c1.175 0 2.148.975 2.148 2.178V18.75c0 1.203-.973 2.179-2.148 2.179H2.648C1.473 20.929.5 19.953.5 18.75L.513 2.679C.513 1.473 1.476.5 2.647.5h7.732l2.5 2.53Z"
        />
        <path
            fill="#DA282E"
            d="M27.265 5.469H16.323l-2.735-2.79H5.382c-1.504 0-2.721 1.255-2.721 2.79l-.014 16.74c0 1.535 1.23 2.791 2.735 2.791h21.883C28.769 25 30 23.744 30 22.21V8.259c0-1.535-1.231-2.79-2.735-2.79Zm-8.206 13.95H8.118v-2.79h10.94v2.79Zm5.47-5.58H8.118v-2.79h16.411v2.79Z"
        />
    </svg>
)
export default SvgComponent
