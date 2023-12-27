import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={39}
        height={26}
        fill="none"
        {...props}
    >
        <path
            stroke="#2E4057"
            d="m32.066 7.929-3.364-3.117h9.488v8.792l-3.459-3.205-.34-.315-.34.315-11.485 10.626-7.169-6.643-.34-.315-.34.315L3.796 24.503l-1.911-1.77 13.174-12.225 7.168 6.643.34.314.34-.314 9.16-8.489.395-.366-.395-.367Z"
        />
        <path
            fill="#2E4057"
            d="m26.784.734 4.298 3.984-9.16 8.488-7.508-6.958L.504 19.154l2.648 2.453L14.414 11.17l7.508 6.957 11.826-10.94 4.298 3.983V.734H26.784Z"
        />
    </svg>
)
export default SvgComponent
