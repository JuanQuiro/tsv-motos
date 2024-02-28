"use client"
import {Card, CardHeader, CardBody, CardFooter, Avatar, Button} from "@nextui-org/react";
import {Image} from "@nextui-org/react";
import NextImage from "next/image";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs";
import { useState } from "react";


const prisma = new PrismaClient()

export default async function App() {
  const [isFollowed, setIsFollowed] = useState(false);

  return (
    <>

    

    
    <div className="grid grid-cols-1">
    <Card className=" mx-2">
      <CardHeader className="justify-between">
        <div className="flex gap-5 mx-auto">
          <Avatar isBordered radius="full" size="md" src="/avatars/avatar-1.png" />
          <div className="flex  flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">Juan Quiroz</h4>
            <h5 className="text-small tracking-tight text-default-400">C.I = 30.391.154</h5>
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
        <p className="mx-auto">Inicio 02/01/2024</p>
      </CardBody>
    </Card>

    <Card className="m-4 my-0 mt-3 text-center	">
      <CardBody>
        <p className="mx-auto">Final 02/01/2024</p>
      </CardBody>
    </Card>

    <Card className="m-4 my-0 mt-3 text-center mx-10 col-span-2">
      <CardBody>
        <p className="mx-auto">Especificaciones</p>
        <Image
      as={NextImage}
      width={300}
      height={150}
      alt="NextUI hero Image"
      src="/sport-100cc.png"
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
    
    <Card className=" mx-3 col-span-1">
    <Card className="mx-4  my-3">
      <CardBody>
        <p className="mx-auto">
          <span className="text-red-600">Urgente:</span> Tener un Servicio de Mantenimineto, ponte al dia lo antes posible y continua disfrutando de nuestro servicios.
        </p>
      </CardBody>

    </Card>
    <div className="grid grid-cols-3">

      <div className="col-span-3">
      <p className="text-center text-lg underline font-semibold mx-auto">
        Proximo Pago
      </p>
      </div>

    <div className="mx-6">
      <Card className="grid place-items-center">
      <span>Fecha</span>
        21/2/2023
        </Card>
    </div>

    <div className="mx-6">
      <Card className="grid py-3 place-items-center">
      44$
        </Card>
    </div>

    <div className="mx-6">
      <Card className="grid place-items-center">
      <span>Estado</span>
      3 dias para el Pago
        </Card>
    </div>

    <div className="grid my-6 col-span-3 place-items-center">
      <Card className="p-2">
        Pagar Ahora 
      </Card>
    </div>

    <div className="grid my-6 col-span-3 place-items-center">
      <h3 className="col-span-3 text-center text-lg underline font-semibold">Feed/Historial</h3>
      <div className="grid grid-cols-2 col-span-3 gap-3">
      <Card className="p-4 my-3 text-center">
        14/2/2024 
      </Card>
      <Card className="p-4 my-3 text-center">
        Retiro de la unidad
      </Card>

      <Card className="p-4 my-3 text-center">
        12/2/2024 
      </Card>
      <Card className="p-4 my-3 text-center">
        Pago de Inicial
      </Card>

      <Card className="p-4 my-3 text-center">
        11/2/2024 
      </Card>
      <Card className="p-4 my-3 text-center">
        Verificacion y Aprobacion
      </Card>

      <Card className="p-4 my-3 text-center">
        10/2/2024 
      </Card>
      <Card className="p-4 my-3 text-center">
        Apertura de cuenta
      </Card>
      </div>
    </div>

    </div>

    </Card>
    </div>
    
    </>
  );
}