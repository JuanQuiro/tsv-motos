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
import Youtube from '../components/Youtube'
import FooterDefault from '@/components/page/FooterDefault'


const App = () => {
  return (
    <div>
      <div className='my-3'>
        <h3 className='grid grid-cols-1 place-items-center font-semibold text-2xl'>Bienvenidos a TVS Finance.</h3>
        <span className='grid grid-cols-1 place-items-center '>La herramienta web que te permite pagar tu moto en cuotas de manera sencilla, accesible y segura.</span>
      </div>
      <div className='grid grid-cols-2'>
        
        <Card className='group hover:bg-black/10 mx-4 py-4 animate-fade-left animate-duration-[900ms] animate-ease-in-out'>
          <CardHeader className='flex-col items-start px-4 pb-0 pt-2'>
            <p className=' text-xl font-bold'>Trak 150cc</p>
          </CardHeader>
          <CardBody className='overflow-visible grid grid-cols-2 py-2'>
            <Image
              as={NextImage}
              alt='Card background'
              className='rounded-xl object-cover group-hover:scale-125'
              src='/motos.png'
              height={300}
              width={270}
            />
            <div className='grid justify-center place-items-center content-center	'>
            <h3 className='text-xl font-semibold'>Inicial: 700$</h3>
            <p className='text-lg text-black/60'>Y luego pagar</p>
            <Button className='text-white text-xl mx-auto font-bold group-hover:text-yellow-300 bg-[#243984] '>44$</Button>
            <span className='text-xs'>Semanales por 24 semanas</span>
            
            </div>
          </CardBody>
        </Card>
        <Card className='group hover:bg-black/10 mx-4 py-4 animate-fade-left animate-duration-[900ms] animate-ease-in-out'>
          <CardHeader className='flex-col items-start px-4 pb-0 pt-2'>
            <p className=' text-xl font-bold'>HLX 150x 5 Gear</p>
          </CardHeader>
          <CardBody className='overflow-visible grid grid-cols-2 py-2'>
            <Image
              as={NextImage}
              alt='Card background'
              className='rounded-xl object-cover group-hover:scale-125'
              src='/motos1.png'
              height={300}
              width={270}
            />
            <div className='grid justify-center content-center	place-items-center'>
            <h3 className='text-xl font-semibold'>Inicial: 700$</h3>
            <p className='text-lg text-black/60'>Y luego pagar</p>
            <Button className='text-white text-xl mx-auto font-bold group-hover:text-yellow-300 bg-[#243984] '>44$</Button>
            <span className='text-xs'>Semanales por 24 semanas</span>
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
      <div className='grid place-items-center bg-gray-100	py-3'>

      <h3 className='text-xl font-semibold py-1'>¿Como Funciona?</h3>
      <span className='pb-2'>Mira el siguiente video explicativo y aprende cómo funciona nuestro servicio.</span>
      <Youtube />
      <p className='mx-40 text-center mt-3'>Nuestra misión es brindarte una experiencia simple y amigable durante el proceso de compra a plazos de tu Moto 0 km. Facilitamos todas las herramientas necesarias para el seguimiento y pago digital de las cuotas semanales, mientras ofrecemos un conjunto de beneficios exclusivos a nuestros clientes activos.</p>
      </div>

      <div className='grid place-items-center bg-white py-5	'>
      <h3 className='text-2xl underline font-semibold py-1'>Beneficios Exclusivos</h3>
      <ul className="list-disc font-medium text-base grid place-items-center py-3">
  <li>Interfaz amigable y fácil de usar.</li>
  <li>Pagos digitales en moneda nacional o extranjera.</li>
  <li>Chat de atencion personalizada.</li>
  <li>Chat de atencion personalizada.</li>
  <li>Garantia de motor y caja por 24 meses.</li>
  <li>Mantenimiento Basico Durante Garantia.</li>
  <li>Seguro Contra Catastrofe.</li>
  <li>Y mucho mas!!</li>

</ul>
      </div>
      <MotosSection />
      <FooterDefault />
    </div>
  )
}

export default App
