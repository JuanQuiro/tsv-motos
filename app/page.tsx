'use client'
import React from 'react'
import MotosSection from '../components/page/MotosSection'
import CondicionesSection from '../components/page/CondicionesSection'
import BeneficiosSection from '../components/page/BeneficiosSection'
import { Button, Card, CardBody, CardHeader, Image } from '@nextui-org/react'
import sbr from './sbr.png'
import NextImage from 'next/image'
import { signIn } from 'next-auth/react'
import Link from 'next/link'


const App = () => {
  return (
    <div>
      <div className='grid grid-cols-1'>
        
        <Card className='group hover:bg-black/10 mx-4 py-4 animate-fade-left animate-duration-[900ms] animate-ease-in-out'>
          <CardHeader className='flex-col items-start px-4 pb-0 pt-2'>
            <p className=' text-xl font-bold'>Sport 100cc</p>
          </CardHeader>
          <CardBody className='overflow-visible grid grid-cols-2 py-2'>
            <Image
              as={NextImage}
              alt='Card background'
              className='rounded-xl object-cover group-hover:scale-125'
              src='/sport-100cc.png'
              height={300}
              width={270}
            />
            <div className='grid justify-center content-center	'>
            <h3 className='text-xl font-semibold'>Inicial: 750$</h3>
            <p className='text-lg text-black/60'>Y luego pagar</p>
            <Button className='text-white text-xl mx-auto font-bold group-hover:text-yellow-300 bg-[#243984] '>65$</Button>
            
            </div>
          </CardBody>
        </Card>
      </div>
      <div className='grid justify-center my-5'>
        <div className='mx-auto'>
        <Button href="/credito"
      as={Link} className='bg-[#243984] text-white text-xl'>Aplicar ahora</Button>
        </div>
        <p className='mt-2 mx-auto '>Registrate y completa el formulario para aplicar a nuestro servicio. Verificaremos tu informacion y te notificaremos el resultado en menos de <strong>72h</strong></p>
      </div>
      <MotosSection />
      <CondicionesSection />
      <BeneficiosSection />
    </div>
  )
}

export default App
