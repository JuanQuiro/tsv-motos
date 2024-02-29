import { PrismaClient } from "@prisma/client";
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const prisma = new PrismaClient();
    const token = await req.json() as any;
    
    if (token) {
      const user = await prisma.clerk.update({
        where: { id_clerk: token || 'ERROR' },
        data: {
          firma_mandada: true
        },
      })
    }

    
    return NextResponse.json({ msj: 'Bien', status : 200 });
  } catch (error) {
    console.error(error);
    // Handle the error here
    return NextResponse.json({ msj: 'Error', status : 500 });
  }
};