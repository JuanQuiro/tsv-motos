import { PrismaClient } from "@prisma/client";
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const prisma = new PrismaClient();
    const token = await req.json() as any;
    
    if (token) {
      const user = await prisma.aceptados.create({
        data: {
          id_clerk : token || 'Error',
          aceptado : true
        },
      })
    }

    try {
      const user2 = await prisma.clerk.update({
        where: { id_clerk: token || 'ERROR' },
        data: { aprobacion_tvs: true },
      });
    } catch (error) {
      console.error('Error al actualizar el usuario en la tabla clerk:', error);
      return NextResponse.json({ msj: 'Error', status : 500 });
    }

    return NextResponse.json({ msj: 'Aceptar', status : 200 });
  } catch (error) {
    console.error(error);
    // Handle the error here
    return NextResponse.json({ msj: 'Error', status : 500 });
  }
};