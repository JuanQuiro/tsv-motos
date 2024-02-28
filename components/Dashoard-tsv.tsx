"use client"
import {Card, CardHeader, CardBody, CardFooter, Avatar, Button} from "@nextui-org/react";
import {Image} from "@nextui-org/react";
import NextImage from "next/image";
import { PrismaClient } from "@prisma/client";
import React, { useRef } from 'react';

import { auth } from "@clerk/nextjs";

import SignatureCanvas from 'react-signature-canvas'
import { useState } from "react";


const prisma = new PrismaClient()

export default function App({allData,documento, imagenes} : any) {
  console.log(allData,documento,imagenes);

  const pasos = [
    { id: 1, nombre: 'Aplicación' },
    { id: 2, nombre: 'Aprobación' },
    { id: 3, nombre: 'Firma' },
    { id: 4, nombre: 'Pago de Inicial' },
    { id: 5, nombre: 'Retiro' }
  ];
  
  const [isFollowed, setIsFollowed] = useState(false);
  const [pasoActual, setpasoActual] = useState(1);

  if (pasoActual === 1 && allData.aprobacion_final) {
    setpasoActual(2)
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

    // Envía el formData a la API
    fetch('/firma-update', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
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
          className={`flex items-center ${
            paso.id <= pasoActual ? 'text-green-500' : 'text-gray-500'
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
                        src={imagenes.persona_cedula} />

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



                </div></>

)
}
    </Card>
    </div>
    </>
  );
}



