import LinkNext from 'next/link'
import React from 'react'
import {Link} from "@nextui-org/react";


const MotosSection = () => {
  return (
    <footer className="footer items-center p-4 bg-neutral text-neutral-content">
  <aside className="items-center grid-flow-col">
    <p> © 2024 ASISTO, C.A - Todos los derechos reservados</p>
  </aside> 
  <nav className="grid-flow-col sm:grid hidden gap-4 md:place-self-center md:justify-self-end">
  <a className="link link-hover" href="/somos" >Quienes Somos</a>
  <a className="link link-hover" href="/contacto" >Contacto</a>
  </nav>
</footer>
  )
}

export default MotosSection
