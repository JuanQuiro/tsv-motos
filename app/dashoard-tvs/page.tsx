import {Card, CardHeader, CardBody, CardFooter, Avatar, Button} from "@nextui-org/react";
import {Image} from "@nextui-org/react";
import NextImage from "next/image";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs";
import Dashoard from "@/components/Dashoard-tsv";


export default async function App() {
  const prisma = new PrismaClient()
  const { userId } : { userId: string | null } = auth();
  const allData = await prisma.clerk.findFirst({
    where: { id_clerk: userId || 'ERROR' },
  })
  const allDocumento = await prisma.data_formulario.findFirst({
    where: { id_clerk: userId || 'ERROR' },
  })

  const allImagenes = await prisma.documentos.findFirst({
    where: { id_clerk: userId || 'ERROR' },
  })

  const firma = await prisma.firma.findFirst({
    where: { id_clerk: userId || 'ERROR' },
  })

  return (
    <>
    <Dashoard allData={allData} documento={allDocumento}  imagenes={allImagenes} firma={firma} />
    </>
  );
}
