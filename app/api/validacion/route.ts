import { PrismaClient } from "@prisma/client";
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server'
import type { NextApiRequest, NextApiResponse } from 'next'



export async function POST(req: Request) {

  const prisma = new PrismaClient()
  const data = await req.json() as any;
  console.log(data);

  const serverToken = "123";

  if (data.pass === serverToken) {
    const prismaClerk = async () => {
      await prisma.admin.create({
        data: {
          autorizacion: true,
          id_clerk: data.id || 'ERROR'
        }
      })
    }
    prismaClerk()

    return NextResponse.json({ msj: 'Bien cargo', status : 200 })
  } else {
    console.log('asa');

    return NextResponse.json({ msj: 'Mal no cargo', status : 404 })
  }

};