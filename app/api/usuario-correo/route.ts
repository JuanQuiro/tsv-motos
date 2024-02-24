import { PrismaClient } from "@prisma/client";
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  
    return NextResponse.json({ msj: 'HOLA', status : 500, req });
  
};