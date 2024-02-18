import { PrismaClient } from "@prisma/client";
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server'
import type { NextApiRequest, NextApiResponse } from 'next'



export async function POST(req: Request) {
  console.log('sasas');

  const prisma = new PrismaClient()
  const token = await req.json() as any;
  console.log(token);

  const serverToken = "123";

  if (token === serverToken) {
    const { userId }: { userId: string | null } = auth();
    const prismaClerk = async () => {
      await prisma.admin.create({
        data: {
          autorizacion: true,
          id_clerk: userId || 'ERROR'
        }
      })
    }
    prismaClerk()
    console.log('sasa');

    return NextResponse.json({ msj: 'Bien cargo', status : 200 })
  } else {
    console.log('asa');

    return NextResponse.json({ msj: 'Mal no cargo', status : 404 })
  }

};