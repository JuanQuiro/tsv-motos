'use client'
import React, { useEffect } from 'react'
import MotosSection from '@/components/page/MotosSection'
import CondicionesSection from '@/components/page/CondicionesSection'
import BeneficiosSection from '@/components/page/BeneficiosSection'
import { Button, ButtonGroup, Card, CardBody, CardHeader, Image } from '@nextui-org/react'
import TvsTrank from '@/components/TvsTrank'
import NextImage from 'next/image'
import { signIn } from 'next-auth/react'
import LinkNext from 'next/link'
import Youtube from '@/components/Youtube'
import FooterDefault from '@/components/FooterDefault'
import { Link } from '@nextui-org/react'
import TvsHlx from '@/components/TvsHlx'
import axios, { all } from 'axios';




import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from '@nextui-org/react'
import { useUser } from '@clerk/nextjs'

// million-ignore
const App = ({ alldata }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();


  const { user } = useUser();


  const handdleFormulario = () => {
    console.log('Formularios');
    onOpen()


  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = [
          { name: 'John', age: 30 },
          { name: 'Jane', age: 25 },
          // Otros objetos de usuario...
        ];

        const response = await axios.post('/api/usuario-correo', { user: user });
        console.log(response);
        // Hacer algo con la respuesta exitosa aquí
      } catch (error) {
        console.error(error);
        // Manejar el error aquí
      }
    };

    fetchData();
  }, []);



  return (
    <>
      <Modal
        size={'5xl'}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className='text-xs lg:text-sm'>
                <div className="flex flex-col items-center ">
                  <h1 className="text-lg font-bold mb-4 text-center">¡Bienvenido al proceso de aplicación para el servicio de MotoStudio! 😄</h1>
                  <p className="text-lg hidden lg:flex mb-4">Estamos emocionados de que estés aquí y deseamos facilitarte el proceso de solicitud de financiamiento. Para que puedas completar el formulario con éxito, aquí te dejamos algunas recomendaciones importantes:</p>

                  <table className='hidden lg:block'>
  <tr>
    <td className="border border-gray-300 p-4">
      <h2 className="text-lg font-bold">Documentos necesarios:</h2>
      <p>- Asegúrate de tener a la mano tu documento de identidad original. Debe estar vigente y contar con al menos 6 meses de validez restante. 📄</p>
    </td>
  </tr>
  <tr>
    <td className="border border-gray-300 p-4">
      <h2 className="text-lg font-bold">Captura de pantalla de ingresos:</h2>
      <p>- Prepara una captura de pantalla del tablero de la aplicación de delivery para la que trabajas. Asegúrate de que los ingresos sean claramente visibles. 📸</p>
    </td>
  </tr>
  <tr>
    <td className="border border-gray-300 p-4">
      <h2 className="text-lg font-bold">Verificación de identidad:</h2>
      <p>- Tendrás que proporcionar tu nombre completo, número de identificación y una foto clara de tu documento de identidad. También necesitaremos un selfie tuyo sosteniendo tu identificación al lado de tu rostro. 📸👤</p>
    </td>
  </tr>
  <tr>
    <td className="border border-gray-300 p-4">
      <h2 className="text-lg font-bold">Verificación de domicilio:</h2>
      <p>- Ten a mano la dirección completa donde resides y el número de RIF. Este último documento debe mostrar claramente tu dirección actual. 🏠</p>
    </td>
  </tr>
  <tr>
    <td className="border border-gray-300 p-4">
      <h2 className="text-lg font-bold">Aceptación de términos y condiciones:</h2>
      <p>- Por último, asegúrate de revisar detenidamente nuestros términos y condiciones y estar de acuerdo con ellos antes de enviar tu solicitud. ✅</p>
    </td>
  </tr>
</table>

                  <div className="p-4 block lg:hidden bg-gray-100">
                    <p className="mb-2 text-lg font-bold">Este proceso consta de dos procesos</p>
                    <p className="flex items-center mb-2">
                      <span className="mr-2 text-2xl">👤</span>
                      <span>Uno: Se refire a los datos personales</span>
                    </p>
                    <p className="flex items-center">
                      <span className="mr-2 text-2xl">📄</span>
                      <span>Dos: Se refire a los documentos requeridos</span>
                    </p>
                  </div>

                  <div className='lg:hidden grid'>

                    <ButtonGroup className='mb-24 lg:mb-0' >
                      <Button color="danger" variant="light" onPress={onClose}>
                        Cerrar
                      </Button>
                      <Button href='/credito' as={LinkNext} color="primary" >
                        Continuar
                      </Button>
                    </ButtonGroup>

                  </div>
                 


                </div>
              </ModalBody>
              <ModalFooter className='hidden lg:block text-xs lg:text-lg'>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Button href='/credito' as={LinkNext} color="primary" >
                  Continuar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
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

            {(alldata?.estado_proceso === null) || (alldata?.estado_proceso === undefined) &&
              <Button
                onClick={() => handdleFormulario()}

                className='bg-[#243984] text-xl text-white'
              >
                Aplicar ahora
              </Button>
            }

            {(alldata?.estado_proceso) &&
              <Button
                href='/credito'
                as={LinkNext}
                className='bg-[#243984] text-xl text-white'
              >
                Continuar con el proceso
              </Button>
            }

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
    </>
  )
}

export default App
