import { PrismaClient } from '@prisma/client';
import Formulario from "../../components/formario-documentos";
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';
import {Card, CardHeader, CardBody, CardFooter, Avatar, Button} from "@nextui-org/react";
import Image from 'next/image';
const { getMonitor } = require("consulta-dolar-venezuela");
import YummyPanel from "../../components/YummyPannel";

const elements = [
  { date: '14/2/2024', content: 'Retiro de la unidad' },
  { date: '12/2/2024', content: 'Luis Martinez' },
  { date: '12/2/2024', content: 'Pago de Inicial' },
  { date: '11/2/2024', content: 'Verificacion y Aprobacion' },
];

const prisma = new PrismaClient()

export default async function App() {
  const { userId } = auth()
  const validador = await prisma.admin_yummy.findFirst({
    where: { id_clerk: userId || 'ERROR' },
  })

  //console.log('Data :',validador);

  if(validador === null) return redirect('/')

  const { price } = await getMonitor("BCV", "lastUpdate").then((data: any) => {
    //console.log(data,'sas',data.bcv);
    return data.bcv
  });

  const allData = await prisma.clerk.findMany({})
  const Imagenes = await prisma.documentos.findMany({})

  return (
    <YummyPanel allData={allData} price={price} imagenes={Imagenes}  />
  );
};
