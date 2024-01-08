'use client'
import React from 'react'
import MotosSection from '../components/page/MotosSection'
import CondicionesSection from '../components/page/CondicionesSection'
import BeneficiosSection from '../components/page/BeneficiosSection'
import { Card, CardBody, CardHeader, Image } from '@nextui-org/react'
import sbr from './sbr.png'
import NextImage from 'next/image'
import { signIn } from 'next-auth/react'

const App = () => {
  return (
    <div>
      <button onClick={() => signIn()}>Sign in</button>
      <div className='grid grid-cols-2'>
        <Card className='mx-4 py-4'>
          <CardHeader className='flex-col items-start px-4 pb-0 pt-2'>
            <p className=' text-xl font-bold'>Moto wow</p>
          </CardHeader>
          <CardBody className='overflow-visible py-2'>
            <Image
              as={NextImage}
              alt='Card background'
              className='rounded-xl object-cover hover:scale-125'
              src='https://beravirtual.com/wp-content/uploads/2021/09/SBR-NUEVA-LILA.png'
              height={300}
              width={270}
            />
          </CardBody>
        </Card>
        <Card className='mx-4 py-4'>
          <CardHeader className='flex-col items-start px-4 pb-0 pt-2'>
            <p className=' text-xl font-bold'>Moto Ultra wow</p>
          </CardHeader>
          <CardBody className='overflow-visible py-2'>
            <Image
              as={NextImage}
              alt='Card background'
              className='rounded-xl object-cover hover:scale-125'
              src='https://beravirtual.com/wp-content/uploads/2021/09/SBR-NUEVA-LILA.png'
              height={300}
              width={270}
            />
          </CardBody>
        </Card>
      </div>
      <MotosSection />
      <CondicionesSection />
      <BeneficiosSection />
    </div>
  )
}

export default App
