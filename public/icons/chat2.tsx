import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={19}
        height={19}
        fill="none"
        {...props}
    >
        <path
            fill="#fff"
            d="M18.353 6.316v7.606c0 .927-.797 1.686-1.77 1.686H4.187L.647 18.98V3.804c0-.928.797-1.686 1.77-1.686h8.942a4.4 4.4 0 0 0-.088.843c0 2.327 1.983 4.215 4.426 4.215 1 0 1.912-.328 2.656-.86ZM13.04 2.961c0 1.4 1.186 2.53 2.656 2.53 1.47 0 2.656-1.13 2.656-2.53S17.167.43 15.697.43c-1.47 0-2.656 1.13-2.656 2.53Z"
        />
    </svg>
)
export default SvgComponent
