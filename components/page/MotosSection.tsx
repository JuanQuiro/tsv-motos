import React from 'react'
import { Button } from '@nextui-org/react'
import Link from 'next/link'

const MotosSection = () => {
  return (
    <div className='bg-gray-100 grid place-items-center	gap-4  py-10'>
  <p className='text-lg text-center'>Descubre todos los detalles sobre cómo funciona nuestro servicio antes de comenzar tu experiencia con nosotros.</p>
  <Button href="/credito"
      as={Link} className='bg-[#243984] text-white text-xl'>Mas Detalles</Button>
    </div>
  )
}

export default MotosSection
