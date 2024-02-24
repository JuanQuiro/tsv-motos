import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) { 
  if (req.method !== 'POST') {
    return NextResponse.json({ msj: 'Mal no es POST', status : 404 });

  }

  try {
    const data = await req.json() as any;
    console.log(data);
    

   

    return NextResponse.json({ msj: 'Creado con exito', status : 201,dato:data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ msj: 'Creado con exito', status : 201 });
  }
}