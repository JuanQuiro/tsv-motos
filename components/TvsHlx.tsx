'use client'
import React from 'react'
import MotosSection from './page/MotosSection'
import CondicionesSection from './page/CondicionesSection'
import BeneficiosSection from './page/BeneficiosSection'
import { Button, Card, CardBody, CardHeader, Image } from '@nextui-org/react'
import sbr from './sbr.png'
import NextImage from 'next/image'
import { signIn } from 'next-auth/react'
import LinkNext from 'next/link'
import Youtube from './Youtube'
import FooterDefault from '@/components/FooterDefault'
import {Link} from "@nextui-org/react";


import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";

const App = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
        <Card onPress={onOpen} isPressable className='group hover:bg-black/10 mx-4 py-4 animate-fade-left animate-duration-[900ms] animate-ease-in-out'>
          <CardHeader className='flex-col items-start px-4 pb-0 pt-2'>
            <p className=' text-xl font-bold'>TVS HLX 150x 5 Gear</p>
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
            <CardBody className='grid justify-center place-items-center content-center	'>
            <h3 className='sm:text-xl text-xs font-semibold'>Inicial: 700$</h3>
            <p className='sm:text-lg text-xs text-center text-black/60'>Y luego pagar</p>
            <div className='btn btn-outline '>44$</div>
            <span className='text-xs sm:text-lg text-center'>Semanales por 24 semanas</span>
            
            </CardBody>
          </CardBody>
        </Card>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">TVS HLX 150</ModalHeader>
              <ModalBody>
                <p> 
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                  dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. 
                  Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. 
                  Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur 
                  proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
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