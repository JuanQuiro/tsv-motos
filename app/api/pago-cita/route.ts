import { user } from "@nextui-org/react";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from 'next/server';

export async function POST(req: Request) {

  const prisma = new PrismaClient();
  const data = await req.json() as any;
  console.log(data);


  try {
    const pagocita = await prisma.clerk.update({
      where: { id_clerk: data.user },
      data: {
        dirrecion_cita: data.dirrecionCita,
        monto_pagar: data.montoPagar,
        hora_pagar: data.horaCita,
        fecha_pagar: data.fechaPago,
      },
    });
    console.log({pagocita});
    

    return NextResponse.json({ msj: 'Aceptar', status: 200 });
  } catch (error) {
    return NextResponse.json({ msj: 'Error', status: 400 });
  }


  return NextResponse.json({ msj: 'Aceptar', status: 200 });
}