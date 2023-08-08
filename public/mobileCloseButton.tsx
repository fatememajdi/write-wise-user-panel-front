import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={36}
    fill="none"
    {...props}
  >
    <circle cx={18} cy={18} r={17.5} fill="#fff" stroke="url(#a)" />
    <path
      fill="url(#b)"
      d="m23.25 13.883-1.058-1.133L18 17.242l-4.193-4.492-1.057 1.133 4.192 4.492-4.192 4.492L13.807 24 18 19.508 22.192 24l1.058-1.133-4.193-4.492 4.193-4.492Z"
    />
    <defs>
      <linearGradient
        id="a"
        x1={18.088}
        x2={18.088}
        y1={11.164}
        y2={52.994}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#354860" stopOpacity={0.66} />
        <stop offset={1} stopColor="#DA282E" stopOpacity={0.5} />
      </linearGradient>
      <linearGradient
        id="b"
        x1={12.75}
        x2={18.675}
        y1={8.431}
        y2={23.738}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#DA282E" />
        <stop offset={1} stopColor="#2E4057" />
      </linearGradient>
    </defs>
  </svg>
)
export default SvgComponent
