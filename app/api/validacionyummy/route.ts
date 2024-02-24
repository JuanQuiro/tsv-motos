import { PrismaClient } from "@prisma/client";
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const prisma = new PrismaClient();
    const token = await req.json() as any;
    console.log(token);

    const serverToken = "123";

    if (token.pass === serverToken) {
      const prismaClerk = async () => {
        try {
          await prisma.admin_yummy.create({
            data: {
              autorizacion: true,
              id_clerk: token.id || 'ERROR'
            }
          });
        } catch (error) {
          console.error(error);
          return NextResponse.json({ msj: 'Mal no cargo prisma', status : 404 });
        }
      };

      await prismaClerk();

      return NextResponse.json({ msj: 'Bien cargo', status : 200 });
    } else {
      return NextResponse.json({ msj: 'Mal no cargo', status : 404 });
    }
  } catch (error) {
    console.error(error);
    // Handle the error here
    return NextResponse.json({ msj: 'Error', status : 500 });
  }
};