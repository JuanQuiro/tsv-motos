'use client'
import React from 'react'
import MotosSection from '../components/page/MotosSection'
import CondicionesSection from '../components/page/CondicionesSection'
import BeneficiosSection from '../components/page/BeneficiosSection'
import { Button, Card, CardBody, CardHeader, Image } from '@nextui-org/react'
import sbr from './sbr.png'
import NextImage from 'next/image'
import { signIn } from 'next-auth/react'
import LinkNext from 'next/link'
import Youtube from '../components/Youtube'
import FooterDefault from '@/components/FooterDefault'
import {Link} from "@nextui-org/react";


import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import Botonera from './Botonera2'

const App = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
        <Card onPress={onOpen} isPressable className='group hover:bg-black/10 mx-4 py-4 animate-fade-left animate-duration-[900ms] animate-ease-in-out'>
          <CardHeader className='flex-col items-start px-4 pb-0 pt-2'>
            <p className=' text-xl font-bold'>TVS Trak 150cc</p>
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
            <CardBody className='grid justify-center place-items-center content-center	'>
            <h3 className='sm:text-xl text-xs font-semibold'>Inicial: 700$</h3>
            <p className='sm:text-lg text-xs text-center text-black/60'>Y luego pagar</p>
            <p className="btn btn-outline">44$</p>
            <span className='text-xs sm:text-lg text-center'>Semanales por 24 semanas</span>
            
            </CardBody>
          </CardBody>
        </Card>
        <Modal size='5xl' isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">TVS Trak 150cc</ModalHeader>
              <ModalBody>
                <Botonera />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary" onPress={onClose}>
                  Comprar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
        </>
  )
}

export default App