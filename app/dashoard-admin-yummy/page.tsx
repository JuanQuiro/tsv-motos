import { PrismaClient } from '@prisma/client';
import Formulario from "../../components/formario-documentos";
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';
import {Card, CardHeader, CardBody, CardFooter, Avatar, Button} from "@nextui-org/react";
import Image from 'next/image';
const { getMonitor } = require("consulta-dolar-venezuela");
import YummyPanel from "../../components/YummyPannel";

const prisma = new PrismaClient()

export default async function App() {



  const { userId } = auth()
  const validador = await prisma.admin_yummy.findFirst({
    where: { id_clerk: userId || 'ERROR' },
  })

  console.log('Data :',validador);

  if(validador === null) return redirect('/')

  let price = 0;



  
  try {
    const { price: monitorPrice } = await getMonitor("BCV", "lastUpdate").then((data: any) => {
    return data.bcv || 'Actualizando';
  });

  price = monitorPrice;
  // Resto del código para manejar el precio obtenido correctamente
} catch (error) {
  console.error("Error:", error);
  // Resto del código para manejar el error 504
}

const dataFormulario = await prisma.data_formulario.findMany({})
  const allData = await prisma.clerk.findMany({})
  const Imagenes = await prisma.documentos.findMany({})
  const Iniciados = await prisma.correo_iniciando_estimacion.findMany({})

  return (
    <YummyPanel allData={allData} price={price} dataFormulario={dataFormulario} imagenes={Imagenes} Iniciados={Iniciados}  />
  );
};
