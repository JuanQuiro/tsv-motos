import * as React from "react"
const SvgComponent = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={200}
    height={200}
    {...props}
  >
    <path d="M178.5 140.25v-102L0 216.75l178.5 178.5V290.7c127.5 0 216.75 40.8 280.5 130.05-25.5-127.5-102-255-280.5-280.5z" />
  </svg>
)
export default SvgComponent
