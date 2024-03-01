"use client"
import { Card, CardHeader, CardBody, CardFooter, Avatar, Button, Input } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import NextImage from "next/image";
import { PrismaClient } from "@prisma/client";
import React, { useRef } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';

const schema = z.object({
  telefonoEmisor: z.string().min(2, 'El teléfono emisor es requerido'),
  fechaPago: z.string().min(1, 'La fecha de pago es requerida'),
  bancoEmisor: z.string().min(1, 'El banco emisor es requerido'),
  comprobante: z.instanceof(File)
    .optional()
    .refine((file) => {
      return !file || file.size <= 1024 * 1024 * 3;
    }, 'El archivo no puede ser mayor a 3 MB')
    .refine((file) => {
      // @ts-ignore
      return ['image/png'].includes(file.type);
    }, 'Elarchivo debe ser PNG'),
});

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";


import SignatureCanvas from 'react-signature-canvas'
import { useState } from "react";

type Inputs = z.infer<typeof schema>

const prisma = new PrismaClient()

export default function App({ allData, documento, imagenes, firma, DocsFirmas }: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  console.log('firma', firma);
  let isFirma;
  if (firma) {
    isFirma = true;
  } else {
    isFirma = false;
  }

  const [firmaUser, setFirmaUser] = useState(isFirma);


  const pasos = [
    { id: 1, nombre: 'Aplicación' },
    { id: 2, nombre: 'Aprobación' },
    { id: 3, nombre: 'Firma' },
    { id: 4, nombre: 'Pago de Inicial' },
    { id: 5, nombre: 'Retiro' }
  ];

  const [isRegistrar, setIsRegistrar] = useState(false);
  const [pasoActual, setpasoActual] = useState(1);

  if (pasoActual === 1 && allData.firma_mandada) {
    setpasoActual(3);
  } else if (allData.aprobacion_final && pasoActual !== 3) {
    setpasoActual(2);
  }

  const signatureRef = useRef();

  const handleSave = () => {
    // Obtén el archivo de imagen de la firma
    // @ts-ignore
    const canvas = signatureRef?.current?.getCanvas();
    const dataURL = canvas.toDataURL();
    console.log(dataURL);


    // Crea un objeto FormData
    const formData = new FormData();
    const file = dataURLtoFile(dataURL, 'signature.png');
    formData.append('signature', file);
    formData.append('userId', allData.id_clerk);

    // Envía el formData a la API
    fetch('/api/firma-update', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setFirmaUser(true)
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleClear = () => {
    // Limpiar el lienzo de la firma
    // @ts-ignore
    signatureRef?.current?.clear();
  };

  // Convierte el dataURL en un archivo
  const dataURLtoFile = (dataURL: string, fileName: string) => {
    const arr = dataURL.split(',');
    // @ts-ignore
    const mime = arr[0]?.match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
  };

  const handleButtonClickPago = () => {
    setIsRegistrar(true)

  }
  console.log({ pasoActual });


  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: zodResolver(schema)
  })


  const onSubmit = (data: any) => {
    console.log(data);
    // Aquí puedes enviar los datos a tu backend o hacer cualquier otra acción
  };


  return (
    <>




      <div className="grid grid-cols-4">
        <Card className=" mx-2">
          <CardHeader className="justify-between">
            <div className="flex gap-5 mx-auto">
              <Avatar isBordered radius="full" size="md" src={allData.img} />
              <div className="flex  flex-col gap-1 items-start justify-center">
                <h4 className="text-small font-semibold leading-none text-default-600">{allData.username}</h4>
                <h5 className="text-small tracking-tight text-default-400">C.I = {documento.Cedula}</h5>
              </div>
            </div>
          </CardHeader>
          <div className="grid grid-cols-2">
            <Card className="m-4 my-0 col-span-2">
              <CardBody>
                <p className="mx-auto">Contrato #0003512584</p>
              </CardBody>
            </Card>

            <Card className="m-4 my-0 mt-3 text-center	">
              <CardBody>
                <p className="mx-auto">N/A</p>
              </CardBody>
            </Card>

            <Card className="m-4 my-0 mt-3 text-center	">
              <CardBody>
                <p className="mx-auto">N/A</p>
              </CardBody>
            </Card>

            <Card className="m-4 my-0 mt-3 text-center mx-10 col-span-2">
              <CardBody>
                <p className="mx-auto">Especificaciones</p>
                <Image
                  as={NextImage}
                  width={200}
                  height={50}
                  alt="NextUI hero Image"
                  src="/motoMisterio.png"
                />
              </CardBody>
            </Card>

            <Card className="m-4 my-0 mt-3 text-center	col-span-2">
              <CardBody>
                <p className="mx-auto">Detalles de Unidad</p>
              </CardBody>
            </Card>

            <Card className="m-4 my-0 mt-3 text-center	col-span-2">
              <CardBody>
                <p className="mx-auto ">Garantia</p>
              </CardBody>
            </Card>

            <Card className="m-4 my-0 mt-3 text-center	col-span-2">
              <CardBody>
                <p className="mx-auto">Shop/Respuestos</p>
              </CardBody>
            </Card>

            <Card className="m-4 my-0 mt-3 text-center	col-span-2">
              <CardBody>
                <p className="mx-auto">Ayuda</p>
              </CardBody>
            </Card>

          </div>
          <CardFooter>
          </CardFooter>
        </Card>

        <Card className=" mx-3 col-span-3">
          <div className="mx-5 my-5">

            <div className="flex justify-between">
              {pasos.map((paso) => (
                <div
                  key={paso.id}
                  className={`flex items-center ${paso.id <= pasoActual ? 'text-green-500' : 'text-gray-500'
                    }`}
                >
                  {paso.id <= pasoActual ? (
                    <svg
                      className="w-6 h-6 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                      <line x1="9" y1="9" x2="9.01" y2="9" />
                      <line x1="15" y1="9" x2="15.01" y2="9" />
                    </svg>
                  ) : (
                    <div className="w-6 h-6 border-2 border-gray-300 rounded-full mr-2" />
                  )}
                  <span>{paso.nombre}</span>
                </div>
              ))}
            </div>


          </div>

          {
            pasoActual === 1 && (


              <><Card className="mx-4  my-3">
                <CardBody>
                  <p className="mx-auto">
                    <span className="text-red-600">Gracias por Aplicar:</span> Estamos revisando la información que nos facilitaste en las proximas horas te estaremos notificando
                  </p>
                </CardBody>

              </Card><div className="grid grid-cols-3 ">

                  <div className="col-span-3">
                    <p className="text-center text-lg underline font-semibold mx-auto mb-5">
                      Validacion de Yummy =
                    </p>
                  </div>

                  <div className="mx-6">
                    <Card className="grid py-3 place-items-center">
                      Validacion de Yummy = {allData.aprobacion_yummy ? 'si' : 'no'}
                    </Card>
                  </div>

                  <div className="mx-6">
                    <Card className="grid place-items-center">
                      Imagen cedula con usuario =

                      <Image
                        as={NextImage}
                        width={200}
                        height={50}
                        alt="NextUI hero Image"
                        src={imagenes?.persona_cedula} />

                    </Card>
                  </div>


                  <div className="mx-6">
                    <Card className="grid py-3 place-items-center">
                      Dirrecion = {documento.Dirrecion}
                    </Card>
                  </div>



                </div></>

            )
          }

          {
            pasoActual === 2 && (


              <><Card className="mx-4  my-3">
                <CardBody>
                  <p className="mx-auto">
                    <span className="text-green-500">¡Felicidades! Tu postulación a sido aprobada.</span> Por favor, lee y firma nuestro contrato digital para el siguiente paso
                  </p>
                </CardBody>

              </Card><div className=" grid-cols-3 ">

                  <div className="col-span-3">
                    <p className="text-center text-lg underline font-semibold mx-auto mb-5">
                      Firma de Contrato =
                    </p>
                  </div>

                  {firmaUser === false && (

                    <div className="grid place-items-center border mx-auto">

                      <SignatureCanvas
                        // @ts-ignore
                        ref={signatureRef}
                        canvasProps={{
                          width: 500,
                          height: 200,
                          className: 'signature-canvas',
                        }}
                      />
                      <div>
                        <Button onClick={handleSave}>Guardar firma</Button>
                        <Button onClick={handleClear}>Limpiar</Button>
                      </div>

                    </div>
                  )}

                  {firmaUser === true && (

                    <div className="grid place-items-center mx-auto">

                      <h3>Firma Ya agregada. Por favor, espere para el siguiente paso</h3>

                    </div>
                  )}

                </div></>

            )
          }

          {
            pasoActual === 3 && (


              <><Card className="mx-4  my-3">
                <CardBody>
                  <p className="mx-auto">
                    <span className="text-green-500">¡Gracias por la Firma!</span> Ahora solo falta un paso, inicia con el pago inicial para disfrutar de nuestro servicio
                  </p>
                </CardBody>

              </Card><div>

                  <div className="col-span-2 grid place-items-center">
                    <p className="text-center text-lg underline font-semibold mx-auto mb-5">
                      Pago Movil =
                    </p>
                    <span className="text-center">Seleccione el metodo de tu preferencia</span>
                  </div>
                  <div className="grid grid-cols-2 gap-5 place-content-around mt-5">

                    <Button color="primary" onPress={onOpen} variant="ghost">
                      Pago Movil
                    </Button>
                    <Button color="primary" variant="ghost">
                      Efectivo
                    </Button>
                  </div>

                </div></>

            )
          }
        </Card>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Pago Movil</ModalHeader>
              <ModalBody>
                {
                  (isRegistrar === false) && (


                    <><p>
                      Realize el siguiente pago Movil y dale a Reportar =
                    </p><Card className="mx-auto p-3">
                        0412-456.96.58<br></br>
                        J-605012533<br></br>
                        BancaAmiga (0172)
                      </Card><p className="mx-auto">
                        Monto a Pagar = 26.474,00 Bs
                      </p></>
                  )}
                {
                  (isRegistrar === true) && (

                    <>
                      <p>Reporta tu pago =</p><p>Introduce los datos del pago movil realizado para poder verificar</p>

                      <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                          <Input
                            classNames={{
                              label: "border-none",
                              input: [
                                "border-none",
                              ],
                              innerWrapper: "border-none",
                              inputWrapper: [
                                "border-none",
                              ],
                            }}

                            label='Telefono Emisor'
                            id="telefonoEmisor"
                            type="text"
                            {...register("telefonoEmisor")}
                          />
                          {errors.telefonoEmisor && <span>{errors.telefonoEmisor.message}</span>}
                        </div>

                        <div>
                          <Input
                            classNames={{
                              label: "border-none",
                              input: [
                                "border-none",
                              ],
                              innerWrapper: "border-none",
                              inputWrapper: [
                                "border-none",
                              ],
                            }}
                            type="date"
                            id="fechaPago"
                            {...register("fechaPago")}
                          />
                          {errors.fechaPago && <span>{errors.fechaPago.message}</span>}
                        </div>

                        <div>
                          <Input
                            classNames={{
                              label: "border-none",
                              input: [
                                "border-none",
                              ],
                              innerWrapper: "border-none",
                              inputWrapper: [
                                "border-none",
                              ],
                            }}
                            label='Banco Emisor'
                            type="text"
                            id="bancoEmisor"
                            {...register("bancoEmisor")}

                          />
                          {errors.bancoEmisor && <span>{errors.bancoEmisor.message}</span>}
                        </div>

                        <div>
                          <label>Comprobante:</label>
                          <input
                            type="file"
                            id="comprobante"
                            {...register("comprobante")}
                          />
                          {errors.comprobante && <span>{errors.comprobante.message}</span>}
                        </div>

                        <Button type="submit">Enviar</Button>
                      </form>


                    </>
                  )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                {
                  (isRegistrar === false) &&
                  <Button color="primary" onPress={() => handleButtonClickPago()}>
                    Registrar Pago
                  </Button>
                }
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}



