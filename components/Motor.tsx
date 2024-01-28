import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    id="Layer_1"
    data-name="Layer 1"
    viewBox="0 0 48 48"
    {...props}
  >
    <defs>
      <style>
        {
          ".cls-1,.cls-2{fill:none;stroke:#353535;stroke-width:2px;stroke-miterlimit:10}.cls-2{stroke-linecap:round}"
        }
      </style>
    </defs>
    <title />
    <path d="M43.01 22v11M39.01 22v11M.01 23h5M1.01 23v-9" className="cls-1" />
    <path d="M9.51 11h21.5" className="cls-2" />
    <path d="M1.01 23v9" className="cls-1" />
    <path
      d="M28 38h11.01v-5h4v5h2.5a57.814 57.814 0 0 0 0-26h-2.5v5h-4v-4a2 2 0 0 0-2-2h-1l-4.5-5h-17l-4.5 5h-3a2 2 0 0 0-2 2v19h4l4 6H20"
      className="cls-2"
    />
    <path d="M8.01 15h2M15.01 1h16M18.01 1v5M28.01 1v5" className="cls-1" />
    <circle cx={24} cy={25} r={9} className="cls-2" />
    <path
      d="M24 34v13"
      style={{
        strokeLinejoin: "round",
        strokeLinecap: "round",
        fill: "none",
        stroke: "#353535",
        strokeWidth: 2,
      }}
    />
  </svg>
)
export default SvgComponent
