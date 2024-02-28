import { PrismaClient } from "@prisma/client";
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const prisma = new PrismaClient();
    const token = await req.json() as any;
    
    if (token) {
      const user = await prisma.aceptados_yummy.create({
        data: {
          id_clerk : token || 'Error',
          aceptado : true
        },
      })
    }

  } catch (error) {
    console.error(error);
    // Handle the error here
    return NextResponse.json({ msj: 'Error', status : 500 });
  }
  return NextResponse.json({ msj: 'Aceptar', status : 200 });
};