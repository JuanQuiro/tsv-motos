'use client'
import React from 'react'
import MotosSection from '../components/page/MotosSection'
import CondicionesSection from '../components/page/CondicionesSection'
import BeneficiosSection from '../components/page/BeneficiosSection'
import { Button, Card, CardBody, CardHeader, Image } from '@nextui-org/react'
import TvsTrank from '../components/TvsTrank'
import NextImage from 'next/image'
import { signIn } from 'next-auth/react'
import LinkNext from 'next/link'
import Youtube from '../components/Youtube'
import FooterDefault from '@/components/FooterDefault'
import {Link} from "@nextui-org/react";
import TvsHlx from "../components/TvsHlx";


import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";

const App = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <div>
      <div className='my-3'>
        <h3 className='grid grid-cols-1 place-items-center font-semibold text-2xl'>Bienvenidos a MotoStudio.</h3>
        <span className='grid grid-cols-1 place-items-center text-center'>La herramienta web que te permite pagar tu moto en cuotas de manera sencilla, accesible y segura.</span>
      </div>
      <div className='grid grid-cols-2 place-content-between'>
        <TvsTrank />
        <TvsHlx />
      </div>
      <div className='grid justify-center my-5'>
        <div className='mx-auto'>
        <Button href="/credito"
      as={LinkNext} className='bg-[#243984] text-white text-xl'>Aplicar ahora</Button>
        </div>
        <p className='mt-2 mx-auto text-center'>Registrate y completa el formulario para aplicar a nuestro servicio. Verificaremos tu informacion y te notificaremos el resultado en menos de <strong>72h</strong></p>
      </div>
      <div className='grid place-items-center bg-gray-100	py-3'>

      <h3 className='text-xl font-semibold py-1'>¿Como Funciona?</h3>
      <span className='pb-2 text-center'>Mira el siguiente video explicativo y aprende cómo funciona nuestro servicio.</span>
      <Youtube />
      <div className='grid place-items-center text-'>
      <Button
      href="https://www.youtube.com/watch?v=f-iVZG7Xbuk"
      as={Link}
      color="primary"
      showAnchorIcon
      variant="solid"
      className='sm:hidden'
    >
      Video Explicativo
    </Button>
      </div>
      <p className='sm:mx-40 mx-3 text-center mt-3'>Nuestra misión es brindarte una experiencia simple y amigable durante el proceso de compra a plazos de tu Moto 0 km. Facilitamos todas las herramientas necesarias para el seguimiento y pago digital de las cuotas semanales, mientras ofrecemos un conjunto de beneficios exclusivos a nuestros clientes activos.</p>
      </div>

      <div className='grid place-items-center bg-white py-5	'>
      <h3 className='text-2xl underline font-semibold py-1'>Beneficios Exclusivos</h3>
      <ul className="list-disc font-medium text-base grid text-center place-items-center py-3">
  <li>Interfaz amigable y fácil de usar.</li>
  <li>Pagos digitales en moneda nacional o extranjera.</li>
  <li>Chat de atencion personalizada.</li>
  <li>Garantia de motor y caja por 24 meses.</li>
  <li>Mantenimiento Basico Durante Garantia.</li>
  <li>Seguro Contra Catastrofes.</li>
  <li>Y mucho mas!!</li>

</ul>
      </div>
      <MotosSection />
      <FooterDefault />
    </div>
  )
}

export default App
