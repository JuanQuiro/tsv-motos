import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export default async function POST(req: Request) {
  if (req.method !== 'POST') {
    return NextResponse.json({ msj: 'Mal no es POST', status : 404 });

  }

  try {
    const { id_clerk, gmail, iniciando } = await req.body as any;

    const createdCorreo = await prisma.correo_iniciando_estimacion.create({
      data: {
        id_clerk,
        gmail,
        iniciando,
      },
    });

    return NextResponse.json({ msj: 'Creado con exito', status : 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ msj: 'Creado con exito', status : 201 });
  }
}