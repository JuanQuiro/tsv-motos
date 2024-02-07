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
import { Link } from '@nextui-org/react'
import TvsHlx from '../components/TvsHlx'
import { currentUser } from '@clerk/nextjs';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from '@nextui-org/react'

const App = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const user = currentUser();
  return (
    <div>
      <div className='my-3'>
        <h3 className='grid grid-cols-1 place-items-center text-2xl font-semibold'>
          Bienvenidos a MotoStudio.
        </h3>
        <span className='grid grid-cols-1 place-items-center text-center'>
          La herramienta web que te permite pagar tu moto en cuotas de manera
          sencilla, accesible y segura.
        </span>
      </div>
      <div className='grid grid-cols-2 place-content-between'>
        <TvsTrank />
        <TvsHlx />
      </div>
      <div className='my-5 grid justify-center'>
        <div className='mx-auto'>
          <Button
            href='/credito'
            as={LinkNext}
            className='bg-[#243984] text-xl text-white'
          >
            Aplicar ahora
          </Button>
        </div>
        <p className='mx-auto mt-2 text-center'>
          Registrate y completa el formulario para aplicar a nuestro servicio.
          Verificaremos tu informacion y te notificaremos el resultado en menos
          de <strong>72h</strong>
        </p>
      </div>
      <div className='grid place-items-center bg-gray-100	py-3'>
        <h3 className='py-1 text-xl font-semibold'>¿Como Funciona?</h3>
        <span className='pb-2 text-center'>
          Mira el siguiente video explicativo y aprende cómo funciona nuestro
          servicio.
        </span>
        <Youtube />
        <div className='text- grid place-items-center'>
          <Button
            href='https://www.youtube.com/watch?v=f-iVZG7Xbuk'
            as={Link}
            color='primary'
            showAnchorIcon
            variant='solid'
            className='sm:hidden'
          >
            Video Explicativo
          </Button>
        </div>
        <p className='mx-3 mt-3 text-center sm:mx-40'>
          Nuestra misión es brindarte una experiencia simple y amigable durante
          el proceso de compra a plazos de tu Moto 0 km. Facilitamos todas las
          herramientas necesarias para el seguimiento y pago digital de las
          cuotas semanales, mientras ofrecemos un conjunto de beneficios
          exclusivos a nuestros clientes activos.
        </p>
      </div>

      <div className='grid place-items-center bg-white py-5	'>
        <h3 className='py-1 text-2xl font-semibold underline'>
          Beneficios Exclusivos
        </h3>
        <ul className='grid list-disc place-items-center py-3 text-center text-base font-medium'>
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
